import { GraphQLModule } from '@graphql-modules/core';
import { Db } from 'mongodb';
import resolversComposition from './resolvers-composition';
import { UserModule } from './modules/user';
import { TeamModule } from './modules/team';

interface InitAppModuleOptions {
  db: Db;
}

export async function initAppModule({ db }: InitAppModuleOptions): Promise<GraphQLModule> {
  return new GraphQLModule({
    name: 'root',
    resolversComposition,
    imports: [
      (await UserModule()).forRoot({
        userCollection: db.collection('user'),
      }),
      (await TeamModule()).forRoot({
        teamCollection: db.collection('team'),
      })
    ]
  });
}
