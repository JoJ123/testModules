import { GraphQLModule } from '@graphql-modules/core';
import { Express } from 'express';
import { Db, MongoClient } from 'mongodb';
import resolversComposition from './resolvers-composition';
import { UserModule } from './modules/user';

interface InitAppModuleOptions {
  db: Db;
}

export async function initAppModule({ db }: InitAppModuleOptions): Promise<GraphQLModule> {
  return new GraphQLModule({
    name: 'root',
    resolversComposition,
    imports: [
      UserModule.forRoot({
        userCollection: db.collection('user'),
      })
    ]
  });
}