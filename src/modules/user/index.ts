import { GraphQLModule } from '@graphql-modules/core';
import * as UserTypeDefs from './schema.graphql';
import resolvers from './resolvers';
import { UserProvider } from './user.provider';

export const UserModule = new GraphQLModule({
  typeDefs: UserTypeDefs,
  resolvers,
  providers: [UserProvider]
});