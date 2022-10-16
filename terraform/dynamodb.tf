resource "aws_dynamodb_table" "exchange-rate" {
  name = "ExchangeRate"
  billing_mode = "PAY_PER_REQUEST"
  hash_key = "baseCurrency"

  attribute {
    name = "baseCurrency"
    type = "S"
  }
}

resource "aws_dynamodb_table" "product" {
  name = "Product"
  billing_mode = "PAY_PER_REQUEST"
  hash_key = "category"
  range_key = "id"

  attribute {
    name = "category"
    type = "S"
  }

  attribute {
    name = "id"
    type = "S"
  }

  attribute {
    name = "baseCurrency"
    type = "S"
  }

  global_secondary_index {
    name               = "CategoryBaseCurrencyIndex"
    hash_key           = "category"
    range_key          = "baseCurrency"
    projection_type    = "ALL"
  }
}
