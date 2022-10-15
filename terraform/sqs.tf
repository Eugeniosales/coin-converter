resource "aws_sqs_queue" "update-exchange-rate-queue" {
  name = "update-exchange-rate-queue"
  visibility_timeout_seconds  = 30
}

resource "aws_sqs_queue_policy" "update-exchange-rate-queue-policy" {
  queue_url = aws_sqs_queue.update-exchange-rate-queue.id

  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Id": "update-exchange-rate-queue-policy",
  "Statement": [
  	{
			"Sid": "First",
			"Effect": "Allow",
			"Principal": {
				"Service": "events.amazonaws.com"
			},
      "Action": "sqs:SendMessage",
      "Resource": "${aws_sqs_queue.update-exchange-rate-queue.arn}",
    }
  ]
}
POLICY
}
