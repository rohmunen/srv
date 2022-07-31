import express from 'express'
import cors from 'cors'
import router from './router.js'
import { connectDB } from './db/client.js'
import { errorMiddleware } from './middlewares/error-middleware.js'

export default class Server {

  constructor() {
    this.server = express()
    this.port = process.env.PORT || '8080'
  }

  static create() {
    const server = new Server
    server.initDb()
    server.initMiddlewares()
    server.initRouter()
    server.initErrorHandling()
    return server
  }

  initMiddlewares() {
    this.server.use(express.json())
    this.server.use(cors())
  }

  initErrorHandling() {
    this.server.use(errorMiddleware)
  }

  initRouter() {
    this.server.use('/api', router)
  }

  async initDb() {
    connectDB();
  }

  async listen() {
    this.server.listen(this.port, () => {
      console.log('server is running on localhost:' + this.port)
    })
  }
}

