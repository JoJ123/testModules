import { Collection, MongoError } from 'mongodb';
import { generateRandomMongoId } from './generate-random-mongo-id';

export async function addCollectionItem<T>(collection: Collection<T>, item: any) {
  let count = 0;
  while (true) {
    try {
      item._id = generateRandomMongoId();
      const result = await collection.insertOne(item);
      return result;
    } catch (e) {
      // from packages\api\node_modules\mongodb\lib\db.js
      // 67 = 'CannotCreateIndex' (malformed index options)
      // 85 = 'IndexOptionsConflict' (index already exists with different options)
      // 11000 = 'DuplicateKey' (couldn't build unique index because of dupes)
      // 11600 = 'InterruptedAtShutdown' (interrupted at shutdown)
      if (e instanceof MongoError && e.code === 11000 && ++count < 10) {
        // Collsion Code
        // ingnore but trace
        console.log('addCollectionItem id collision', `original error: ${e}, ${count}`);
      } else {
        console.log('add-collection-item', e);
        throw e;
      }
    }
  }
}
