import express from 'express'
import next from 'next'

const hostname = 'localhost'
const port = 3000
const dev = process.env.NODE_ENV !== 'production'

const app = express()

const nextApp = next({
  dev,
  hostname,
  port
})

const handle = nextApp.getRequestHandler()

nextApp.prepare().then(() => {
  app.get('/app-path', (req, res) => {
    return handle(req, res)
  })

  app.get('/app-path/*', (req, res) => {
    return handle(req, res)
  })

  app.get('/api/hello', (_req, res) => {
    res.send('world')
  })

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`App up and running on port ${port}`)
  })
})
