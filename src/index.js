import app from './app'
import { CONFIG } from './config'

run().catch(errorHandler)

async function run() {
  console.log(
    `[${CONFIG.TITLE}] starting ${CONFIG.TITLE} in ${info(ENV.MODE || '')} mode`
  )

  app.listen(4000, () => {
    console.log(
      `[${CONFIG.TITLE}] listening on port ${info(ENV.PORT || 'unknown')}`
    )
  })
}

function errorHandler(e) {
  console.log(`[${CONFIG.TITLE}] ${error(`error: ${e.message}`)}`)
  console.warn(e)
}
