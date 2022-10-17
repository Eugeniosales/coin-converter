resource "aws_cloudwatch_event_rule" "update_exchange_rate_rule" {
  name = "update-exchange-rate-rule"
  description = "update exchange rate rule"
  schedule_expression = "rate(1 minute)" # Could be replaced to 1 minute or less
}
