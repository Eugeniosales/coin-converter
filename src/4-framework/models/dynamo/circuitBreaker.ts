import dynamoose, { Schema } from 'dynamoose'
import { Document } from 'dynamoose/dist/Document'
import { SchemaDefinition } from 'dynamoose/dist/Schema'
import { Model, ModelOptionsOptional } from 'dynamoose/dist/Model'
import { CircuitBreakerData } from '../../../2-business/utils/circuitBreaker'

export interface CircuitBreakerEntity extends Document, CircuitBreakerData { }

const schemaDefinition: SchemaDefinition = {
  key: {
    type: String,
    hashKey: true
  },
  state: {
    type: String,
    required: true
  },
  options: {
    type: Object,
    required: true
  },
  nextAvailabilityCheckTimestamp: {
    type: Number,
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

export const CircuitBreakerModel: Model<CircuitBreakerEntity> =
  dynamoose.model('CircuitBreaker', schema, modelOptions)
