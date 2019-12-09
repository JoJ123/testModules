import { GraphQLModule } from '@graphql-modules/core';
import { TeamProvider } from './providers/team.provider';
import { TeamModuleConfig } from './config';
import { loadResolversFilesAsync, loadSchemaFilesAsync } from '@graphql-toolkit/file-loading';
import { DIRECTIVES } from '@graphql-codegen/typescript-mongodb';

export const TeamModule = async () => new GraphQLModule<TeamModuleConfig>({
  name: 'team',
  imports: [],
  typeDefs: [DIRECTIVES, ...(await loadSchemaFilesAsync(__dirname + '/types/', { useRequire: true }))],
  resolvers: loadResolversFilesAsync(__dirname + '/resolvers/'),
  providers: [TeamProvider]
});