import * as crypto from 'crypto';
import { ObjectID } from 'mongodb';

export function generateRandomMongoId() {
  return new ObjectID(crypto.randomBytes(12).toString('hex'));
}
