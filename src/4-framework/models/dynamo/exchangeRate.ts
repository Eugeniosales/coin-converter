import dynamoose, { Schema } from 'dynamoose'
import { Document } from 'dynamoose/dist/Document'
import { SchemaDefinition } from 'dynamoose/dist/Schema'
import { Model, ModelOptionsOptional } from 'dynamoose/dist/Model'
import { ExchangeRate } from '../../../1-domain/entities/exchangeRate'

export interface ExchangeRateEntity extends Document, ExchangeRate { }

const schemaDefinition: SchemaDefinition = {
  baseCurrency: {
    type: String,
    hashKey: true
  },
  rates: {
    type: Object,
    required: true
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

export const ExchangeRateModel: Model<ExchangeRateEntity> =
  dynamoose.model('ExchangeRate', schema, modelOptions)
