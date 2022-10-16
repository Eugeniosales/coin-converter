resource "aws_lb" "lb-sbf-exchangerate" {
  name               = "sbf-exchangerate-${var.aws_profile}-lb"
  internal           = false
  load_balancer_type = "application"

  ip_address_type = "ipv4"

  tags = {
    service = "sbf-exchangerate",
    stage = var.aws_profile
  }
}

resource "aws_lb_listener" "http-lb-sbf-exchangerate" {
  load_balancer_arn = aws_lb.lb-sbf-exchangerate.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type = "fixed-response"

    fixed_response {
      content_type = "text/plain"
      message_body = "The resource can't be found."
      status_code  = "404"
    }
  }
}