resource "aws_dynamodb_table" "exchange-rate" {
  name = "ExchangeRate"
  billing_mode = "PAY_PER_REQUEST"
  hash_key = "baseCurrency"

  attribute {
    name = "baseCurrency"
    type = "S"
  }
}
