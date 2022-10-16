resource "aws_ssm_parameter" "update-exchange-rate-queue-arn-ssm" {
  name = "/exchangeRate/infra/sqs/updateExchangeRateQueueArn"
  type = "String"
  value = aws_sqs_queue.update-exchange-rate-queue.arn
  overwrite = true
}

resource "aws_ssm_parameter" "exchange-rate-api-token-ssm" {
  name  = "/exchangeRate/infra/api/exchangeRate/token"
  type  = "String"
  value = "custom"
  overwrite = true
}

resource "aws_ssm_parameter" "exchange-rate-internal-url-ssm" {
  name  = "/exchangerate/infra/alb/arn"
  type  = "String"
  value = "${var.EXCHANGE_RATE_INTERNAL_URL}"
  overwrite = true
}