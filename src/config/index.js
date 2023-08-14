import * as dotenv from 'dotenv'
dotenv.config()

export const ENV = {
  SALTROUND: Number(process.env.SALTROUND),
  PORT: process.env.PORT,
  MODE: process.env.MODE,
  TOKEN_SECRET: String(process.env.TOKEN_SECRET),
  MONGO_URL: process.env.MONGO_URL,
  SSO_URL: process.env.SSO_URL,
  FRONT_URL: process.env.FRONT_URL.split(','),
}

export const CONFIG = {
  TITLE: 'WareHouse',
  VERSION: '1.0.0',
}
