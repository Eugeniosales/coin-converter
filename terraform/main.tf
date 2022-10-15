terraform {

  backend "remote" {
    organization = "Eugeniosales"

    workspaces {
      name = "gh-actions-demo"
    }
  }
}
