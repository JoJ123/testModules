import { GraphQLModule } from '@graphql-modules/core';
import { UserProvider } from './providers/user.provider';
import { UserModuleConfig } from './config';
import { loadResolversFilesAsync, loadSchemaFilesAsync } from '@graphql-toolkit/file-loading';

import { DIRECTIVES } from '@graphql-codegen/typescript-mongodb';

export const UserModule = async () => new GraphQLModule<UserModuleConfig>({
  name: 'user',
  imports: [],
  typeDefs: [DIRECTIVES, ...(await loadSchemaFilesAsync(__dirname + '/types/', { useRequire: true }))],
  resolvers: loadResolversFilesAsync(__dirname + '/resolvers/'),
  providers: [UserProvider]
});