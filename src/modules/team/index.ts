import { GraphQLModule } from '@graphql-modules/core';
import * as TeamTypeDefs from './schema.graphql';
import resolvers from './resolvers';
import { TeamProvider } from './providers/team.provider';
import { TeamModuleConfig } from './config';

export const TeamModule = new GraphQLModule<TeamModuleConfig>({
  typeDefs: TeamTypeDefs,
  resolvers,
  providers: [TeamProvider]
});