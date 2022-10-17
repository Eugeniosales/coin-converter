resource "aws_cloudwatch_event_rule" "update_exchange_rate_rule" {
  name = "update-exchange-rate-rule"
  event_bus_name = aws_cloudwatch_event_bus.exchange_rate_bus.name
  description = "update exchange rate rule"
  schedule_expression = "rate(1 minute)" # Could be replaced to 1 minute or less
}
