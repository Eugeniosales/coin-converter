resource "aws_ssm_parameter" "update-exchange-rate-queue-arn-ssm" {
  name = "/exchangeRate/infra/sqs/updateExchangeRateQueueArn"
  type = "String"
  value = aws_sqs_queue.update-exchange-rate-queue.arn
  overwrite = true
}

resource "aws_ssm_parameter" "exchange-rate-api-token-ssm" {
  name  = "/exchangeRate/infra/api/exchangeRate/token"
  type  = "String"
  value = var.EXCHANGE_RATE_EXTERNAL_TOKEN
  overwrite = true
}

resource "aws_ssm_parameter" "exchange-rate-application-load-balancer-http-arn" {
  name      = "/exchangeRate/infra/alb/exchangeRate/http/arn"
  type      = "String"
  value     = aws_lb_listener.http-lb-sbf-exchangerate.arn
  overwrite = true
}

resource "aws_ssm_parameter" "exchange-rate-application-load-balancer-http-url-ssm" {
  name = "/exchangeRate/infra/alb/exchangeRate/http/url"
  type = "String"
  value = "http://${aws_lb.lb-sbf-exchangerate.dns_name}"
  overwrite = true
}
