import { ResolversComposerMapping } from '@graphql-toolkit/common';

export const allow = (next: any) => (rootValue: any, args: any, context: any, info: any) => next(rootValue, args, context, info);

const mapping: ResolversComposerMapping = {
  'Query.*': allow,
};

export default mapping;
