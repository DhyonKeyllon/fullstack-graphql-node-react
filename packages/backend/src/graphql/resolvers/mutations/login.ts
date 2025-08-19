import { connection } from '../../../memoryDB/connection'
import { User } from '../../../models/User'
import bcrypt from 'bcrypt'

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
      }
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return {
        success: false,
        message: 'Email ou senha incorretos',
        user: null,
      }
    }

    return {
      success: true,
      message: 'Login realizado com sucesso',
      user: {
        name: user.name,
        email: user.email,
        company: user.company,
      },
    }
  } catch (error) {
    console.error('Erro no login:', error)
    return {
      success: false,
      message: 'Erro interno do servidor',
      user: null,
    }
  }
}
