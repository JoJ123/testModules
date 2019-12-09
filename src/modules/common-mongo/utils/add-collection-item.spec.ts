import { MongoError, ObjectId } from 'mongodb';
import { addCollectionItem } from './add-collection-item';

// helper function to create Objects that can be used like mongo collection but does what
// you define with the function promies like function that you give to it
const createCollection = <T = any>(fun: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void) => {
  return {
    insertOne: jest.fn(async () => {
      return new Promise((resolve, reject) =>
        setTimeout(() => {
          fun(resolve, reject);
        }, 1),
      );
    }),
  };
};

describe('Add Collection Item', () => {
  it('should add an item with the collections insertone function', async () => {
    const resovledResult = { result: 'OK' };
    const collection = createCollection(resolve => {
      resolve(resovledResult);
    });
    const newItem = { content: 'abcd' };
    const result = await addCollectionItem(collection as any, newItem);

    const firstCall: any = collection.insertOne.mock.calls[0];

    expect(firstCall[0]).toBe(newItem);
    expect(collection.insertOne.mock.calls.length).toBe(1);
    expect(firstCall.length).toBe(1);
    expect(result).toBe(resovledResult);
  });

  it('should throw any non specific error', async () => {
    const error = new MongoError('generalError');
    const collection = createCollection((resolve, reject) => {
      reject(error);
    });
    const newItem = { content: 'abcd' };
    let thrownErrr;
    try {
      await addCollectionItem(collection as any, newItem);
    } catch (err) {
      thrownErrr = err;
    }
    expect(thrownErrr).toBe(error);
  });

  it('should catch an MongoError - duplicate', async () => {
    const resovledResult = { result: 'OK' };

    const error = new MongoError('');
    error.code = 11000;
    let count = 0;
    const collection = createCollection((resolve, reject) => {
      if (count < 1) {
        count++;
        reject(error);
      } else {
        resolve(resovledResult);
      }
    });
    const newItem = { content: 'abcd' };
    const result = await addCollectionItem(collection as any, newItem);
    const firstCall: any = collection.insertOne.mock.calls[0];
    const secondCall: any = collection.insertOne.mock.calls[0];

    expect(firstCall[0]).toBe(newItem);
    expect(secondCall[0]).toBe(newItem);

    expect(collection.insertOne.mock.calls.length).toBe(2);
    expect(firstCall.length).toBe(1);
    expect(secondCall.length).toBe(1);

    expect(result).toBe(resovledResult);
  });

  it('should throw stop trying at some point, even its a duplicate error', async () => {
    const resovledResult = { result: 'OK' };

    const error = new MongoError('');
    error.code = 11000;
    const collection = createCollection((resolve, reject) => {
      reject(error);
    });

    let thrownErrr;
    try {
      const newItem = { content: 'abcd' };
      await addCollectionItem(collection as any, newItem);
    } catch (err) {
      thrownErrr = err;
    }
    expect(thrownErrr).toBe(error);
  });

  it('should generate a new ID if the old one is a duplicate', async () => {
    const resovledResult = { result: 'OK' };
    let newID1: any = null;
    let newID2: any = null;
    const error = new MongoError('');
    error.code = 11000;
    let count = 0;
    const newItem = { content: 'abcd' };

    const collection = createCollection((resolve, reject) => {
      if (count < 1) {
        count++;
        newID1 = (newItem as any)._id;
        reject(error);
      } else {
        newID2 = (newItem as any)._id;
        resolve(resovledResult);
      }
    });
    await addCollectionItem(collection as any, newItem);
    // new objects
    expect(newID1).not.toBe(newID2);
    // new object Content
    expect(newID1!.toHexString()).not.toBe(newID2!.toHexString());
  });

  it('should generate random IDs', async () => {
    const resovledResult = { result: 'OK' };

    const collection = createCollection(resolve => {
      resolve(resovledResult);
    });

    const newItem1 = { content: 'abcd' };
    const newItem2 = { content: 'abcd2' };
    await addCollectionItem(collection as any, newItem1);
    await addCollectionItem(collection as any, newItem2);
    // new objects
    expect(((newItem1 as any) as { _id: ObjectId })._id).not.toBe(((newItem2 as any) as { _id: ObjectId })._id);
    // new object Content
    expect(((newItem1 as any) as { _id: ObjectId })._id.toHexString()).not.toBe(((newItem2 as any) as { _id: ObjectId })._id.toHexString());
  });
});
