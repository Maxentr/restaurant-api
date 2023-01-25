import { connect } from "mongoose"
import express, {
  Request,
  Response,
  urlencoded,
  Express,
  NextFunction,
} from "express"
import * as http from "http"
import cookieParser from "cookie-parser"
import { createRouter } from "./router"
import { createClient } from "redis"

class Server {
  private readonly _app: Express
  private _server!: http.Server
  private redisClient: any

  private allowCrossDomain = (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    res.header("Origin", process.env.APP_URL)
    res.header("Access-Control-Allow-Origin", process.env.APP_URL)
    res.header("Access-Control-Allow-Methods", "GET,PUT, PATCH,POST,DELETE")
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    )
    res.header("Access-Control-Allow-Credentials", "true")

    next()
  }

  constructor() {
    this._app = express()
    this._app.use(express.json())
    this._app.use(this.allowCrossDomain)
    this._app.use(urlencoded({ extended: true }))
    this._app.use(cookieParser())

    // Use with rate limit if it's in production & the server have a proxy or more
    process.env.RATE_LIMIT_TRUST_PROXY &&
      this._app.set("trust proxy", parseInt(process.env.RATE_LIMIT_TRUST_PROXY))

    this._app.set("port", process.env.PORT || 3000)
  }

  get app(): Express {
    return this._app
  }

  get server(): http.Server {
    return this._server
  }

  get redis(): any {
    return this.redisClient
  }

  private async connectMongoDB() {
    try {
      await connect(
        `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
      ),
        console.log("🔌 Connected to MongoDB")
    } catch (error) {
      console.log(error)
    }
  }

  private async connectRedis() {
    try {
      // this.redisClient = createClient({
      //   url: `redis://${process.env.RATE_LIMIT_REDIS_USERNAME}:${process.env.RATE_LIMIT_REDIS_PASSWORD}@${process.env.RATE_LIMIT_REDIS_HOST}:${process.env.RATE_LIMIT_REDIS_PORT}/${process.env.RATE_LIMIT_REDIS_DB_NAME}`,
      // })
      // await this.redisClient.connect()
      await new Promise((res) => setTimeout(res, 4000))
      console.log("🔌 Connected to Redis")
    } catch (error) {
      console.log(error)
    }
  }

  public async start() {
    // Connect to MongoDB
    await this.connectMongoDB()

    // Connect to Redis (for rate limit) if it's in production
    if (process.env.NODE_ENV === "production") await this.connectRedis()

    // Add routes to the app
    createRouter(this._app, this.redisClient)

    // Start the server
    this._server = this._app.listen(this._app.get("port"), () => {
      console.log("🚀 Server is running on port " + this._app.get("port"))
      console.log(
        `📄 Swagger is available at: http://localhost:${this._app.get(
          "port",
        )}/docs`,
      )
      console.log("\x1b[0m")
    })
  }
}

export const server = new Server()
