resource "aws_cloudwatch_event_target" "update_exchange_rate_sqs_target" {
  arn = aws_sqs_queue.update-exchange-rate-queue.arn
  rule = aws_cloudwatch_event_rule.update_exchange_rate_rule.name
}
