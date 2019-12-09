import { GraphQLModule } from '@graphql-modules/core';
import * as UserTypeDefs from './schema.graphql';
import resolvers from './resolvers';
import { UserProvider } from './providers/user.provider';
import { UserModuleConfig } from './config';

export const UserModule = new GraphQLModule<UserModuleConfig>({
  typeDefs: UserTypeDefs,
  resolvers,
  providers: [UserProvider]
});