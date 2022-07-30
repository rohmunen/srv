import 'dotenv/config'

import Server from "./server.js"

const start = async () => {
  const server = Server.create()
  server.listen()
}

let retries = 5
while(retries) {
  try {
    await start()
    break;
  } catch (error) {
    console.log(error)
    retries -= 1
    await new Promise(res => setTimeout(res, 5000))
  }
}
