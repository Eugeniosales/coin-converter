resource "aws_ssm_parameter" "ssm-exchange-rate-token" {
  name  = "/sbf/external/api/exchangerate/token"
  type  = "String"
  value = "custom.token"
}
