import { GraphQLModule } from '@graphql-modules/core';
import { DIRECTIVES } from '@graphql-codegen/typescript-mongodb';
import { loadResolversFiles, loadSchemaFiles } from '@graphql-toolkit/file-loading';
import { CommonModuleConfig } from './config';

export const CommonModule = new GraphQLModule<CommonModuleConfig>({
    name: 'common',
    typeDefs: [DIRECTIVES, ...loadSchemaFiles(__dirname + '/types/', { useRequire: true })],
    resolvers: loadResolversFiles(__dirname + '/resolvers/'),
    providers: []
});