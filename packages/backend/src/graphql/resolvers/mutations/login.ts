import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { connection } from '../../../memoryDB/connection'
import { User } from '../../../models/User'

const JWT_SECRET = process.env.JWT_SECRET

export const login = async (_parent, args, _context, _info) => {
  try {
    await connection()

    const { email, password } = args

    const user = await User.findOne({ email })

    if (!user) {
      return {
        success: false,
        message: 'Email ou senha incorretos',
        user: null,
        token: null,
      }
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return {
        success: false,
        message: 'Email ou senha incorretos',
        user: null,
        token: null,
      }
    }

    const tokenPayload = {
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
      company: user.company,
    }

    const token = jwt.sign(tokenPayload, JWT_SECRET, {
      expiresIn: '7d',
      issuer: 'fullstack-app',
      subject: user._id.toString(),
    })

    return {
      success: true,
      message: 'Login realizado com sucesso',
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        company: user.company,
      },
      token,
    }
  } catch (error) {
    console.error('Erro no login:', error)
    return {
      success: false,
      message: 'Erro interno do servidor',
      user: null,
      token: null,
    }
  }
}
