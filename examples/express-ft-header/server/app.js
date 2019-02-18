const express = require('express')

const app = express()
const port = 4567

app.use(require('./middleware/anvil'))

app.get('/', require('./controllers/home'))

app.listen(port, () => {
  console.log(`Listening on PORT:${port}`) // eslint-disable-line no-console
})
