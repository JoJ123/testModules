import { GraphQLModule } from '@graphql-modules/core';
import { TeamProvider } from './providers/team.provider';
import { TeamModuleConfig } from './config';
import { DIRECTIVES } from '@graphql-codegen/typescript-mongodb';
import { loadResolversFiles, loadSchemaFiles } from '@graphql-toolkit/file-loading';
import { UserModule } from '../user';

export const TeamModule = new GraphQLModule<TeamModuleConfig>({
  name: 'team',
  imports: [UserModule],
  typeDefs: [DIRECTIVES, ...loadSchemaFiles(__dirname + '/types/', { useRequire: true })],
  resolvers: loadResolversFiles(__dirname + '/resolvers/'),
  providers: [TeamProvider]
});