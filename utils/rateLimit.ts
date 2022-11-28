import { createClient } from "redis"
import RedisStore from "rate-limit-redis"
import rateLimit, { RateLimitRequestHandler } from "express-rate-limit"

export const createRateLimiter = (
  windowMs: string | number = 60000,
  maxRequest: string | number = 5,
  redisClient: any,
): RateLimitRequestHandler => {
  return rateLimit({
    windowMs: typeof windowMs === "number" ? windowMs : parseInt(windowMs),
    max: typeof maxRequest === "number" ? maxRequest : parseInt(maxRequest),
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: true, // Disable the `X-RateLimit-*` headers
    store: new RedisStore({
      sendCommand: (...args: string[]) => redisClient.sendCommand(args),
    }),
  })
}
