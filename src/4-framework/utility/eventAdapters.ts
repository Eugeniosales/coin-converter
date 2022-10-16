import { ALBEvent, APIGatewayEvent } from 'aws-lambda'

export const albHttpEventNormalizer = (event: ALBEvent) => {
  let payload = {}
  if (event.queryStringParameters) {
    payload = { ...event.queryStringParameters }
  }

  if (event.body) {
    const body = JSON.parse(event.body)
    payload = { ...payload, ...body }
  }

  return payload
}

export const apiGatewayHttpEventNormalizer = (event: APIGatewayEvent) => {
  let payload = {}
  if (event.queryStringParameters) {
    payload = { ...event.queryStringParameters }
  }

  if (event.body) {
    const body = JSON.parse(event.body)
    payload = { ...payload, ...body }
  }

  if (event.pathParameters) {
    payload = { ...payload, ...event.pathParameters }
  }

  return payload
}
