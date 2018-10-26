/* @jsx h */
import { h, Fragment, render } from 'hyperons'
import * as http from 'http'
import Hello from './hello'

const html = render(Hello())

http
  .createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html' })
    response.write(html)
    response.end()
  })
  .listen(2345, () => {
    console.log('listening on PORT 2345')
  })
