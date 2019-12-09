import { ModuleContext } from "@graphql-modules/core";
import { QueryUserArgs } from "src/generated-models";
import { UserProvider } from "../providers/user.provider";

export default {
    Query: {
        user: (root, args: QueryUserArgs, { injector }: ModuleContext) => injector.get(UserProvider).getUserById(args.id),
    },
};