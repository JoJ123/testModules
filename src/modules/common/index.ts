import { GraphQLModule } from '@graphql-modules/core';
import { loadResolversFilesAsync, loadSchemaFilesAsync } from '@graphql-toolkit/file-loading';
import { CommonModuleConfig } from './config';

export const commonModule = new GraphQLModule<CommonModuleConfig>({
  name: 'common',
  typeDefs: loadSchemaFilesAsync(__dirname + '/types/', { useRequire: true }),
  resolvers: loadResolversFilesAsync(__dirname + '/resolvers/'),
  providers: [],
});
