import { GraphQLModule } from '@graphql-modules/core';
import { UserProvider } from './providers/user.provider';
import { UserModuleConfig } from './config';
import { loadResolversFiles, loadSchemaFiles } from '@graphql-toolkit/file-loading';
import { DIRECTIVES } from '@graphql-codegen/typescript-mongodb';

export const UserModule = new GraphQLModule<UserModuleConfig>({
  name: 'user',
  imports: [],
  typeDefs: [DIRECTIVES, ...loadSchemaFiles(__dirname + '/types/', { useRequire: true })],
  resolvers: loadResolversFiles(__dirname + '/resolvers/'),
  providers: [UserProvider]
});