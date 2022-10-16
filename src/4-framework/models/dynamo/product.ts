import dynamoose, { Schema } from 'dynamoose'
import { Document } from 'dynamoose/dist/Document'
import { SchemaDefinition } from 'dynamoose/dist/Schema'
import { Model, ModelOptionsOptional } from 'dynamoose/dist/Model'
import { Product } from '../../../1-domain/entities/product'

export interface ProductEntity extends Document, Product { }

const schemaDefinition: SchemaDefinition = {
  category: {
    type: String,
    hashKey: true
  },
  id: {
    type: String,
    rangeKey: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  promotionalPrice: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  colors: {
    type: Array,
    required: true
  },
  currency: {
    type: String,
    required: true,
    index: {
      name: 'CategoryBaseCurrencyIndex',
      global: true
    }
  }
}

const schema = new Schema(schemaDefinition, {
  timestamps: true,
  saveUnknown: true
})

const modelOptions: ModelOptionsOptional = {
  throughput: 'ON_DEMAND',
  create: false,
  waitForActive: false
}

export const ProductModel: Model<ProductEntity> =
  dynamoose.model('Product', schema, modelOptions)
