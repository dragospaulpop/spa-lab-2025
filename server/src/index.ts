import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

const users = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
  { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com' },
  { id: 3, name: 'John Smith', email: 'john.smith@example.com' },
  { id: 4, name: 'Jane Smith', email: 'jane.smith@example.com' },
]

const products = [
  { id: 1, name: 'Product 1', price: 100, description: 'Product 1 description' },
  { id: 2, name: 'Product 2', price: 200, description: 'Product 2 description' },
  { id: 3, name: 'Product 3', price: 300, description: 'Product 3 description' },
  { id: 4, name: 'Product 4', price: 400, description: 'Product 4 description' },
]

app.use(cors())

app.get('/', async (c) => {
  await Bun.sleep(1000)
  return c.json({ message: 'Hello Hono!' })
})

app.get('/page1', async (c) => {
  await Bun.sleep(1000)
  return c.json(users)
})

app.get('/page2', async (c) => {
  await Bun.sleep(1000)
  return c.json(products)
})

export default app
