variable "ENV" {
  type        = string
  description = "Environment"
  default     = null
}
variable "vpc_id" {
  type        = string
  description = "VPC ID"
}

variable "SUB_NET_01" {
  type        = string
  description = "sub net"
  default     = null
}

variable "SUB_NET_02" {
  type        = string
  description = "sub net"
  default     = null
}

variable "base_url_internal" {
  type = string
  description = "base url internal for exchange rate microsservice"
}

variable "aws_profile" {
  type = string
  description = "AWS Profile"
  default = null
}

variable "route53_zone_host" {
  type = string
  description = "Route53 Zone Host"
}

data "aws_route53_zone" "selected" {
  name = var.route53_zone_host
  private_zone = true
}
