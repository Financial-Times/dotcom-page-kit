/* eslint-disable no-console */

const editionMiddleware = require('@financial-times/anvil-middleware-edition')


const express = require('express');
const app = express();

console.log('** express app **')

const instance = editionMiddleware({})
app.use(instance)

app.get('/', (req, res) => { console.log('GET /') || res.send('HELLO WORLD')})

app.listen(3456);
