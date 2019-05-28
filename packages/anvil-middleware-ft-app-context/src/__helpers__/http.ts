import httpMocks from 'node-mocks-http'

export function createHttpResponseWithHeaders(headers) {
  const response = httpMocks.createResponse()
  response.writeHead(200, '', headers)
  return response
}
