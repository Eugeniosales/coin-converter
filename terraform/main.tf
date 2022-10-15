terraform {
  required_version = ">= 0.13"

  backend "remote" {
    organization = "Eugeniosales"
    
    region = "us-east-1"
    
    workspaces {
      name = "gh-actions-demo"
    }
  }
}
