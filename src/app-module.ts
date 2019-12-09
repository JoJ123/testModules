import { GraphQLModule } from '@graphql-modules/core';
import { Db } from 'mongodb';
import resolversComposition from './resolvers-composition';
import { UserModule } from './modules/user';
import { TeamModule } from './modules/team';
import { commonModule } from './modules/common';

interface InitAppModuleOptions {
  db: Db;
}

export async function initAppModule({ db }: InitAppModuleOptions): Promise<GraphQLModule> {
  return new GraphQLModule({
    name: 'root',
    resolversComposition,
    imports: [
      commonModule.forRoot({}),
      UserModule.forRoot({
        userCollection: db.collection('user'),
      }),
      TeamModule.forRoot({
        teamCollection: db.collection('team'),
      })
    ]
  });
}
