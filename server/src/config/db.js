import mongoose from 'mongoose'

const connectDB = async () => {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.warn('MONGODB_URI no configurada. Usa .env para configurarla.')
    return
  }
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000
    })
    console.log(`MongoDB Conectado: ${conn.connection.host}`)
  } catch (error) {
    console.error(`Error de conexión MongoDB: ${error.message}`)
  }
}

export default connectDB