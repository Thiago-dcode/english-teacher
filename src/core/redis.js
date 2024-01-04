const redis = require('redis')
const { config } = require('dotenv')
config()
// Create a Redis client

const client = redis.createClient({
  host: process.env.HOST, // Replace with your Redis host if it's not running locally
  port: 6379 // Redis default port
  // If Redis requires authentication:
  // password: 'your_redis_password_here'
})

// Handle errors
client.on('error', (err) => {
  throw new Error(`Authenticate Error in Auth.js ${err.message}`)
})

module.exports = {
  client
}
