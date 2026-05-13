import Stripe from 'stripe'
import Order from '../models/Order.js'

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null

export const createCheckoutSession = async (req, res) => {
  try {
    const { orderId, currency = 'pen' } = req.body

    const order = await Order.findById(orderId)
    if (!order) {
      return res.status(404).json({ message: 'Orden no encontrada' })
    }

    const amount = currency === 'usd' 
      ? Math.round(order.totalUSD * 100) 
      : Math.round(order.total * 100)

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: order.items.map(item => ({
        price_data: {
          currency: currency,
          product_data: {
            name: item.name,
            images: item.image ? [item.image] : []
          },
          unit_amount: currency === 'usd' 
            ? Math.round(item.priceUSD * 100) 
            : Math.round(item.price * 100)
        },
        quantity: item.quantity
      })),
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/order/success?orderId=${orderId}`,
      cancel_url: `${process.env.CLIENT_URL}/order/cancel?orderId=${orderId}`,
      metadata: {
        orderId: orderId.toString()
      }
    })

    res.json({ url: session.url, sessionId: session.id })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature']
  let event

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const orderId = session.metadata.orderId

    await Order.findByIdAndUpdate(orderId, {
      paymentStatus: 'paid',
      paymentId: session.payment_intent,
      status: 'processing'
    })
  }

  res.json({ received: true })
}