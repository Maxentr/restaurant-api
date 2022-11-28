import { server } from "./src/server"
import { config } from "dotenv"

// Import environment variables
config()
config({ path: ".env" })

if (process.env.NODE_ENV === "production") {
  config({ path: ".env.rate-limit" })
}
console.clear()
console.log("\x1b[1m\x1b[33m🚀 Starting server...")
server.start()
