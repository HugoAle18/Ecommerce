import { productsAPI } from './api'

const knowledgeBase = {
  envio: {
    keywords: ['envío', 'envio', 'entrega', 'llegar', 'demora', 'tiempo', 'shipping', 'delivery'],
    answer: 'Realizamos envíos a todo el Perú. El tiempo de entrega es de 2 a 5 días hábiles en Lima y de 5 a 10 días hábiles para provincias. El envío es gratis en pedidos mayores a S/200.'
  },
  pago: {
    keywords: ['pago', 'pagar', 'tarjeta', 'crédito', 'débito', 'visa', 'mastercard', 'payment', 'stripe'],
    answer: 'Aceptamos pagos con tarjetas de crédito y débito (Visa, Mastercard) a través de Stripe, nuestra pasarela segura. También ofrecemos pago contra entrega en Lima metropolitana.'
  },
  devolucion: {
    keywords: ['devolución', 'devolucion', 'cambio', 'reembolso', 'garantía', 'garantia', 'return', 'refund'],
    answer: 'Tienes 7 días hábiles para devoluciones desde que recibes tu producto. El producto debe estar en su empaque original y sin señales de uso. Todos nuestros productos tienen garantía de 6 meses contra defectos de fábrica.'
  },
  horario: {
    keywords: ['horario', 'atención', 'soporte', 'contacto', 'whatsapp', 'teléfono', 'telefono', 'llamar'],
    answer: 'Nuestro horario de atención es de Lunes a Sábado de 9:00 AM a 8:00 PM. Puedes contactarnos al +51 999 999 999 o escribirnos a contacto@techzone.pe.'
  },
  producto: {
    keywords: ['producto', 'productos', 'catalogo', 'catálogo', 'buscar', 'encuentro', 'tienen', 'venden'],
    action: 'searchProducts'
  },
  precio: {
    keywords: ['precio', 'costo', 'cuánto', 'cuanto', 'vale', 'soles', 'dólares', 'dolares', 'usd', 'pen'],
    answer: 'Todos nuestros precios se muestran en Soles (S/) y puedes cambiarlos a Dólares ($) usando el botón de cambio de moneda en la parte superior de la página.'
  },
  audifonos: {
    keywords: ['audífonos', 'audifonos', 'auriculares', 'headphones', 'earphones'],
    action: 'searchCategory',
    category: 'audifonos'
  },
  cables: {
    keywords: ['cables', 'cargadores', 'cargador', 'power bank', 'cable'],
    action: 'searchCategory',
    category: 'cables'
  },
  smartwatch: {
    keywords: ['smartwatch', 'reloj', 'smartband', 'pulsera', 'watch'],
    action: 'searchCategory',
    category: 'smartwatches'
  },
  accesorios: {
    keywords: ['accesorios', 'funda', 'protector', 'vidrio', 'templado', 'hub', 'tripode'],
    action: 'searchCategory',
    category: 'accesorios'
  },
  saludo: {
    keywords: ['hola', 'buenas', 'hey', 'hi', 'hello', 'qué tal', 'que tal', 'saludos'],
    answer: '¡Hola! Soy el asistente virtual de TechZone. Estoy aquí para ayudarte a encontrar productos, resolver dudas sobre envíos, pagos o devoluciones. ¿En qué puedo ayudarte hoy?'
  },
  gracias: {
    keywords: ['gracias', 'thank', 'thanks', 'vale', 'ok'],
    answer: '¡De nada! Si tienes más preguntas, estoy aquí para ayudarte. ¡Que tengas un excelente día! 😊'
  },
  default: {
    answer: 'No tengo información específica sobre eso. ¿Puedo ayudarte con información sobre productos, envíos, pagos o devoluciones? También puedes escribir "catálogo" para ver todos nuestros productos.'
  }
}

let conversationState = { step: 'idle', lastSearch: '' }

function normalize(text) {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

function findMatch(input) {
  const normalized = normalize(input)

  for (const [, entry] of Object.entries(knowledgeBase)) {
    if (!entry.keywords) continue
    const match = entry.keywords.some(kw => normalized.includes(normalize(kw)))
    if (match) return entry
  }

  return knowledgeBase.default
}

async function processUserMessage(input) {
  const match = findMatch(input)

  if (match.action === 'searchProducts') {
    conversationState.step = 'awaiting_search'
    return '¿Qué tipo de producto estás buscando? Puedes decirme el nombre, la categoría o simplemente escribe "catálogo" para ver todo.'
  }

  if (match.action === 'searchCategory') {
    try {
      const res = await productsAPI.getAll({ category: match.category, limit: 4 })
      const products = res.data.products
      if (products.length === 0) return `No encontré productos en esa categoría.`

      const list = products.map((p, i) =>
        `${i + 1}. *${p.name}* - S/${p.price.toFixed(2)} ($${p.priceUSD.toFixed(2)})`
      ).join('\n')

      return `Estos son algunos productos que tengo:\n\n${list}\n\n¿Quieres ver más detalles de alguno? Puedes visitar nuestro catálogo completo.`
    } catch {
      return 'Hubo un error al buscar productos. Intenta de nuevo más tarde.'
    }
  }

  if (match.action === 'searchCategory') {
    return match.answer
  }

  if (conversationState.step === 'awaiting_search') {
    conversationState.step = 'idle'
    try {
      const res = await productsAPI.getAll({ search: input, limit: 4 })
      const products = res.data.products

      if (products.length === 0) {
        const all = await productsAPI.getAll({ limit: 20 })
        return `No encontré "${input}". Estos son algunos de nuestros productos destacados:\n\n${
          all.data.products.slice(0, 4).map((p, i) =>
            `${i + 1}. *${p.name}* - S/${p.price.toFixed(2)}`
          ).join('\n')
        }\n\nPuedes ver el catálogo completo en nuestra página.`
      }

      const list = products.map((p, i) =>
        `${i + 1}. *${p.name}* - S/${p.price.toFixed(2)} ($${p.priceUSD.toFixed(2)})`
      ).join('\n')

      return `¡Encontré estos productos!\n\n${list}\n\n¿Te interesa alguno? Puedes hacer clic para ver más detalles.`
    } catch {
      return 'Hubo un error. Por favor intenta de nuevo.'
    }
  }

  return match.answer
}

function getInitialMessage() {
  return '¡Bienvenido a TechZone! 🎧\n\nSoy tu asistente virtual. Puedo ayudarte con:\n\n🔍 *Buscar productos*\n📦 *Información de envíos*\n💳 *Métodos de pago*\n🔄 *Devoluciones y garantía*\n\n¿En qué puedo ayudarte?'
}

export { processUserMessage, getInitialMessage }
