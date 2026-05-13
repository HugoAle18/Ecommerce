import User from '../models/User.js'
import jwt from 'jsonwebtoken'

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

export const register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body

    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({ message: 'El usuario ya existe' })
    }

    const user = await User.create({ name, email, password, phone })

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        addresses: user.addresses,
        token: generateToken(user._id)
      })
    } else {
      res.status(401).json({ message: 'Email o contraseña incorrectos' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password')
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)

    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      user.phone = req.body.phone || user.phone

      if (req.body.password) {
        user.password = req.body.password
      }

      const updatedUser = await user.save()
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role
      })
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}