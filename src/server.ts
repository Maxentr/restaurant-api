import { connect } from "mongoose"
import express, {
  Request,
  Response,
  urlencoded,
  Express,
  NextFunction,
} from "express"
import * as http from "http"
import { config } from "dotenv"
import cookieParser from "cookie-parser"

config()

class Server {
  private readonly _app: Express
  private _server!: http.Server

  private allowCrossDomain = function (
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET,PUT, PATCH,POST,DELETE")
    res.header("Access-Control-Allow-Headers", "Content-Type")

    next()
  }

  constructor() {
    this._app = express()
    this._app.use(express.json())
    this._app.use(this.allowCrossDomain)
    this._app.use(urlencoded({ extended: true }))
    this._app.use(cookieParser())

    this._app.set("port", process.env.PORT || 3000)
  }

  get app(): Express {
    return this._app
  }

  get server(): http.Server {
    return this._server
  }

  private async connectMongoDB() {
    try {
      await connect(
        `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
      )
      console.log("🔌 Connected to MongoDB")
    } catch (error) {
      console.log(error)
    }
  }

  public start() {
    this.connectMongoDB()
    this._server = this._app.listen(this._app.get("port"), () => {
      console.log("🚀 Server is running on port " + this._app.get("port"))
    })
  }
}

export const server = new Server()
