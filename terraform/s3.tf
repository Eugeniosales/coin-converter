resource "aws_s3_bucket" "sbf-sls-artifacts" {
  bucket = "sbf-sls-artifacts-custom-test-${var.ENV}"

  tags = {
    Name        = "SBF Serverless deployment artifacts"
    Environment = "${var.ENV}"
  }
}
