resource "aws_ssm_parameter" "update-exchange-rate-queue-arn-ssm" {
  name = "/exchangeRate/infra/sqs/updateExchangeRateQueueArn"
  type = "String"
  value = aws_sqs_queue.shell_credits_refund_queue.arn
  overwrite = true
}

resource "aws_ssm_parameter" "exchange-rate-api-token-ssm" {
  name  = "/exchangeRate/infra/api/exchangeRate/token"
  type  = "String"
  value = ""
}
