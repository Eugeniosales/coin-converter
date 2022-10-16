resource "aws_lb" "lb-sbf-exchangerate" {
  name               = "sbf-exchangerate-${var.aws_profile}-lb"
  internal           = true
  load_balancer_type = "application"
  security_groups    = [aws_security_group.lb.id]
  subnets            = [var.SUB_NET_01, var.SUB_NET_02]

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