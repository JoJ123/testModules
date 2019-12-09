import { GraphQLModule } from '@graphql-modules/core';
import { TeamProvider } from './providers/team.provider';
import { TeamModuleConfig } from './config';
import { loadResolversFilesAsync, loadSchemaFilesAsync } from '@graphql-toolkit/file-loading';
import { commonModule } from '../common';

export const TeamModule = new GraphQLModule<TeamModuleConfig>({
  name: 'team',
  imports: [commonModule],
  typeDefs: loadSchemaFilesAsync(__dirname + '/types/', { useRequire: true }),
  resolvers: loadResolversFilesAsync(__dirname + '/resolvers/'),
  providers: [TeamProvider]
});