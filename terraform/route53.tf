resource "aws_route53_record" "record-sbf-exchangerate" {
  zone_id = data.aws_route53_zone.selected.zone_id
  name    = "sbf-exchangerate"
  type    = "A"

  alias {
    name                   = aws_lb.lb-sbf-exchangerate.dns_name
    zone_id                = aws_lb.lb-sbf-exchangerate.zone_id
    evaluate_target_health = true
  }
}

output "route53_record" {
  value = "${aws_route53_record.record-sbf-exchangerate.name}.${data.aws_route53_zone.selected.name}"
}
