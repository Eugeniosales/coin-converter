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

variable "aws_profile" {
  type = string
  description = "AWS Profile"
  default = null
}

variable "SG_ID" {
  type        = string
  description = "security group id"
  default     = null
}

variable "EXCHANGE_RATE_EXTERNAL_TOKEN" {
  type        = string
  description = "Exchange Rate external API Token"
  default     = null
}