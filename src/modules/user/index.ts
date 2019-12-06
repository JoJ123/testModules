import { GraphQLModule } from '@graphql-modules/core';
// import * as typeDefs from './schema.graphql';
import resolvers, { UserProvider } from './resolvers';
import gql from 'graphql-tag'

export const UserModule = new GraphQLModule({
  typeDefs: gql`
    type Query {
      user(id: ID!): User
    }
    
    type User {
      id: ID!
      username: String!
    }
  `,
  resolvers,
  providers: [UserProvider]
});