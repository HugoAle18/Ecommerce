import mongoose from 'mongoose'

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    console.warn('MONGODB_URI no configurada. Usa .env para configurarla.')
    return
  }
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI)
    console.log(`MongoDB Conectado: ${conn.connection.host}`)
  } catch (error) {
    console.error(`Error de conexión MongoDB: ${error.message}`)
  }
}

export default connectDB