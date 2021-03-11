import { config } from 'dotenv'

config()

export const MEEMONIC = process.env.MEEMONIC as string

if (!MEEMONIC) {
  throw new Error('Missing environment variable: MEEMONIC')
}

export const INFURA_KEY = process.env.INFURA_KEY as string

if (!INFURA_KEY) {
  throw new Error('Missing environment variable: INFURA_KEY')
}
