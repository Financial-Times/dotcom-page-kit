require('sucrase/register')

const { app } = require('./app')

const PORT = process.env.PORT || 3456

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`) // eslint-disable-line no-console
})
