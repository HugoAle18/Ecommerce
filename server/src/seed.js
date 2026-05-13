import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Product from './models/Product.js'
import Category from './models/Category.js'

dotenv.config()

const products = [
  {
    name: 'Audífonos Bluetooth In-ear Pro',
    slug: 'audifonos-bluetooth-in-ear-pro',
    description: 'Audífonos inalámbricos con sonido de alta fidelidad, batería de larga duración y compatibilidad con todos los dispositivos. Ideales para uso diario.',
    price: 149.00,
    priceUSD: 45,
    images: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500'],
    category: 'audifonos',
    brand: 'TechSound',
    stock: 50,
    isFeatured: true,
    specs: { 'Tipo': 'In-ear', 'Conectividad': 'Bluetooth 5.0', 'Batería': '8 horas', 'Micrófono': 'Sí' }
  },
  {
    name: 'Audífonos Over-ear Noise Cancelling',
    slug: 'audifonos-over-ear-noise-cancelling',
    description: 'Audífonos premium con cancelación activa de ruido, sonido envolvente 360° y almohadillas memory foam. Perfectos para viajes y trabajo.',
    price: 299.00,
    priceUSD: 90,
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'],
    category: 'audifonos',
    brand: 'SoundMax',
    stock: 30,
    isFeatured: true,
    specs: { 'Tipo': 'Over-ear', 'ANC': 'Sí', 'Batería': '30 horas', 'Conexión': '3.5mm/Bluetooth' }
  },
  {
    name: 'Audífonos TWS AirPods Style',
    slug: 'audifonos-tws-airpods-style',
    description: 'Audífonos true wireless estilo AirPods con estuche de carga, touch controls y sonido cristalino. Diseño elegante y cómodo.',
    price: 189.00,
    priceUSD: 57,
    images: ['https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500'],
    category: 'audifonos',
    brand: 'TechZone',
    stock: 75,
    isFeatured: true,
    specs: { 'Tipo': 'TWS', 'Estuche': 'Carga magnética', 'Controles': 'Táctil', 'Batería': '24h total' }
  },
  {
    name: 'Audífonos Deportivos Wireless',
    slug: 'audifonos-deportivos-wireless',
    description: 'Audífonos resistentes al sudor con gancho seguro para actividades físicas. Resistente al agua IPX5.',
    price: 179.00,
    priceUSD: 54,
    images: ['https://images.unsplash.com/photo-1515942400420-2b98fed1f515?w=500'],
    category: 'audifonos',
    brand: 'SportFit',
    stock: 40,
    isFeatured: false,
    specs: { 'Tipo': 'In-ear sport', 'Resistencia': 'IPX5', 'Gancho': 'Ajuste seguro', 'Batería': '10 horas' }
  },
  {
    name: 'Bocina Portátil Bluetooth',
    slug: 'bocina-portatil-bluetooth',
    description: 'Bocina Bluetooth potente con bass增强, batería de 12 horas y resistente al agua. Perfecta para fiestas y actividades al aire libre.',
    price: 129.00,
    priceUSD: 39,
    images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500'],
    category: 'audifonos',
    brand: 'BoomBox',
    stock: 60,
    isFeatured: true,
    specs: { 'Potencia': '20W', 'Batería': '12 horas', 'Resistencia': 'IPX7', 'Conectividad': 'Bluetooth 5.0' }
  },
  {
    name: 'Cable USB-C 1m Premium',
    slug: 'cable-usb-c-1m-premium',
    description: 'Cable USB-C de alta velocidad con carga rápida 65W, transferencia de datos a 10Gbps y construcción de nailon trenzado.',
    price: 35.00,
    priceUSD: 10,
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500'],
    category: 'cables',
    brand: 'FastCharge',
    stock: 200,
    isFeatured: false,
    specs: { 'Longitud': '1 metro', 'Potencia': '65W', 'Velocidad': '10Gbps', 'Material': 'Nylon trenzado' }
  },
  {
    name: 'Cable Lightning Certificado MFi',
    slug: 'cable-lightwind-certificado-mfi',
    description: 'Cable Lightning certificado Apple MFi, carga rápida y sincronización. Compatible con todos los dispositivos iOS.',
    price: 45.00,
    priceUSD: 13,
    images: ['https://images.unsplash.com/photo-1596627672823-6f5f8d5d5c2f?w=500'],
    category: 'cables',
    brand: 'ApplePlus',
    stock: 150,
    isFeatured: false,
    specs: { 'Certificación': 'MFi Apple', 'Carga': 'Rápida 2.4A', 'Longitud': '1m/2m', 'Material': 'TPE' }
  },
  {
    name: 'Cargador Rápido 20W USB-C',
    slug: 'cargador-rapido-20w-usb-c',
    description: 'Cargador inteligente 20W con tecnología GaN, compatible con iPhone, Samsung y otros. Carga 50% en 30 min.',
    price: 59.00,
    priceUSD: 18,
    images: ['https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500'],
    category: 'cables',
    brand: 'PowerUp',
    stock: 100,
    isFeatured: true,
    specs: { 'Potencia': '20W', 'Tecnología': 'GaN', 'Puertos': 'USB-C', 'Protección': 'Sobrecarga' }
  },
  {
    name: 'Cargador 65W GaN三口',
    slug: 'cargador-65w-gan-tres-puertos',
    description: 'Cargador GaN de 65W con 3 puertos (2 USB-C + 1 USB-A). Carga múltiples dispositivos simultáneamente.',
    price: 129.00,
    priceUSD: 39,
    images: ['https://images.unsplash.com/photo-1624525711008-20f3e52d5cf7?w=500'],
    category: 'cables',
    brand: 'PowerUp',
    stock: 50,
    isFeatured: false,
    specs: { 'Potencia': '65W', 'Puertos': '2 USB-C + 1 USB-A', 'GaN': 'Sí', 'Viaje': 'Internacional' }
  },
  {
    name: 'Power Bank 20000mAh',
    slug: 'power-bank-20000mah',
    description: 'Batería externa de alta capacidad 20000mAh con carga rápida bidireccional 22.5W y display digital.',
    price: 149.00,
    priceUSD: 45,
    images: ['https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500'],
    category: 'cables',
    brand: 'PowerZone',
    stock: 80,
    isFeatured: true,
    specs: { 'Capacidad': '20000mAh', 'Salida': '22.5W', 'Puertos': '2 USB + USB-C', 'Display': 'LED digital' }
  },
  {
    name: 'Funda Silicone Premium iPhone',
    slug: 'funda-silicone-premium-iphone',
    description: 'Funda de silicone suave con protección antimicrobiana, compatible con MagSafe y cobertura completa.',
    price: 49.00,
    priceUSD: 15,
    images: ['https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500'],
    category: 'accesorios',
    brand: 'CaseZone',
    stock: 120,
    isFeatured: false,
    specs: { 'Material': 'Silicone premium', 'MagSafe': 'Compatible', 'Protección': '360°', 'Colores': 'Múltiples' }
  },
  {
    name: 'Vidrio Templado 9D Premium',
    slug: 'vidrio-templado-9d-premium',
    description: 'Protector de pantalla 9D ultra transparente con cobertura completa, resistente a impactos y rasguños.',
    price: 25.00,
    priceUSD: 8,
    images: ['https://images.unsplash.com/photo-1612442446084-422d945124c9?w=500'],
    category: 'accesorios',
    brand: 'ShieldPro',
    stock: 300,
    isFeatured: false,
    specs: { 'Dureza': '9D', 'Transparencia': '99.9%', 'Grosor': '0.3mm', 'Cobertura': 'Completa' }
  },
  {
    name: 'Adaptador USB-C Hub 7 en 1',
    slug: 'adaptador-usb-c-hub-7-en-1',
    description: 'Hub multifunción con HDMI 4K, USB 3.0, SD/microSD, PD 100W y Ethernet. Perfecto para laptops modernas.',
    price: 79.00,
    priceUSD: 24,
    images: ['https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=500'],
    category: 'accesorios',
    brand: 'ConnectHub',
    stock: 45,
    isFeatured: true,
    specs: { 'Puertos': '7 en 1', 'HDMI': '4K@60Hz', 'PD': '100W', 'Ethernet': 'Gigabit' }
  },
  {
    name: 'Trípode Celular Profesional',
    slug: 'tripode-celular-profesional',
    description: 'Trípode de aluminio ajustable con cabeza giratoria 360°, Compatible con todos los smartphones hasta 12".',
    price: 45.00,
    priceUSD: 13,
    images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500'],
    category: 'accesorios',
    brand: 'FlexMount',
    stock: 60,
    isFeatured: false,
    specs: { 'Material': 'Aluminio', 'Altura': '40-160cm', 'Compatibilidad': 'Universal', 'Cabeza': '360°' }
  },
  {
    name: 'Soporte Carro Magnético',
    slug: 'soporte-carro-magnetico',
    description: 'Soporte magnético para auto con carga inalámbrica rápida. Se adapta a cualquier rejilla de ventilación.',
    price: 35.00,
    priceUSD: 10,
    images: ['https://images.unsplash.com/photo-1544847556-5d38f1c6054e?w=500'],
    category: 'accesorios',
    brand: 'AutoMount',
    stock: 90,
    isFeatured: false,
    specs: { 'Carga': 'Inalámbrica 15W', 'Montaje': 'Rejilla', 'Magnético': '360°', 'Compatibilidad': 'Qi' }
  },
  {
    name: 'Smartband Fitness Pro',
    slug: 'smartband-fitness-pro',
    description: 'Pulsera inteligente con monitor de ritmo cardíaco, sueño, spo2, resistencia agua 5ATM y batería 14 días.',
    price: 129.00,
    priceUSD: 39,
    images: ['https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500'],
    category: 'smartwatches',
    brand: 'FitBand',
    stock: 70,
    isFeatured: true,
    specs: { 'Pantalla': 'AMOLED', 'Batería': '14 días', 'Resistencia': '5ATM', 'Sensores': 'HR, SpO2' }
  },
  {
    name: 'Reloj Smartwatch Deportivo',
    slug: 'reloj-smartwatch-deportivo',
    description: 'Smartwatch con GPS integrado, métricas deportivas avanzadas, pantalla AMOLED 1.4" y batería 7 días.',
    price: 249.00,
    priceUSD: 75,
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'],
    category: 'smartwatches',
    brand: 'TechWatch',
    stock: 35,
    isFeatured: true,
    specs: { 'Pantalla': 'AMOLED 1.4"', 'GPS': 'Integrado', 'Batería': '7 días', 'Modos': '100+' }
  },
  {
    name: 'Banda Apple Watch Sport',
    slug: 'banda-apple-watch-sport',
    description: 'Banda de silicona premium compatible con Apple Watch 38-45mm. Suave, transpirable y resistente.',
    price: 69.00,
    priceUSD: 21,
    images: ['https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500'],
    category: 'smartwatches',
    brand: 'WatchBand',
    stock: 100,
    isFeatured: false,
    specs: { 'Material': 'Silicone premium', 'Compatibilidad': 'Apple Watch', 'Tallas': '38-45mm', 'Colores': '6' }
  },
  {
    name: 'Audífonos Neckband Bluetooth',
    slug: 'audifonos-neckband-bluetooth',
    description: 'Audífonos de collar con drivers de 12mm, batería 18 horas y магнитные earbuds. Cómodo para todo el día.',
    price: 119.00,
    priceUSD: 36,
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'],
    category: 'audifonos',
    brand: 'NeckSound',
    stock: 55,
    isFeatured: false,
    specs: { 'Drivers': '12mm', 'Batería': '18 horas', 'Conectividad': 'Bluetooth 5.0', 'Mic': 'CVC 8.0' }
  },
  {
    name: 'Detector Sueño Inteligente',
    slug: 'detector-sueno-inteligente',
    description: 'Dispositivo de seguimiento del sueño con análisis de ondas cerebrales, alarma inteligente y app móvil.',
    price: 89.00,
    priceUSD: 27,
    images: ['https://images.unsplash.com/photo-1510017803434-a899398421b3?w=500'],
    category: 'smartwatches',
    brand: 'SleepTech',
    stock: 25,
    isFeatured: false,
    specs: { 'Sensor': 'EEG', 'Análisis': 'Ondas cerebrales', 'Alarma': 'Inteligente', 'App': 'iOS/Android' }
  }
]

const categories = [
  { name: 'Audífonos', slug: 'audifonos', description: 'Audífonos wireless, TWS y más', image: '' },
  { name: 'Cables y Cargadores', slug: 'cables', description: 'Cables USB, cargadores y powerbanks', image: '' },
  { name: 'Accesorios', slug: 'accesorios', description: 'Fundas, protectores y accesorios', image: '' },
  { name: 'Smartwatches', slug: 'smartwatches', description: 'Relojes inteligentes y bandas', image: '' }
]

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Conectado a MongoDB')

    await Category.deleteMany({})
    await Product.deleteMany({})
    console.log('Datos anteriores eliminados')

    await Category.insertMany(categories)
    console.log('Categorías insertadas')

    await Product.insertMany(products)
    console.log('Productos insertados')

    console.log('Seed completado exitosamente!')
    process.exit()
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

seedDB()