import app from './app'
import mongoose from 'mongoose'
import { CONFIG, ENV } from './config'

run().catch(errorHandler)

async function run() {
  console.log(
    `[${CONFIG.TITLE}] starting ${CONFIG.TITLE} in ${ENV.MODE || ''} mode`
  )

  await mongoose.connect(ENV.MONGO_URL)

  app.listen(4000, () => {
    console.log(`[${CONFIG.TITLE}] listening on port ${ENV.PORT || 'unknown'}`)
  })
}

function errorHandler(e) {
  console.log(`[${CONFIG.TITLE}] error: ${e.message}`)
  console.warn(e)
}
