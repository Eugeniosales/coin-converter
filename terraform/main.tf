terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "3.26.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "3.0.1"
    }
  }
  required_version = ">= 1.1.0"

  cloud {
    organization = "Eugeniosales"

    workspaces {
      name = "gh-actions-demo"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

variable "route53_zone_host" {
  type = string
  description = "Route53 Zone Host"
}

data "aws_route53_zone" "selected" {
  name = var.route53_zone_host
  private_zone = true
}
