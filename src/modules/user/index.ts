import { GraphQLModule } from '@graphql-modules/core';
import { UserProvider } from './providers/user.provider';
import { UserModuleConfig } from './config';
import { loadResolversFilesAsync, loadSchemaFilesAsync } from '@graphql-toolkit/file-loading';
import { commonModule } from '../common';

export const UserModule = new GraphQLModule<UserModuleConfig>({
  name: 'user',
  imports: [commonModule],
  typeDefs: loadSchemaFilesAsync(__dirname + '/types/', { useRequire: true }),
  resolvers: loadResolversFilesAsync(__dirname + '/resolvers/'),
  providers: [UserProvider]
});