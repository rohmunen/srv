import 'dotenv/config'

import Server from "./server.js"

const start = async () => {
  const server = Server.create()
  await server.listen()
}

start()