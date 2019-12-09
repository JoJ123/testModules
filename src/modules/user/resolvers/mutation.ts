import { ModuleContext } from "@graphql-modules/core";
import { UserProvider } from "../providers/user.provider";
import { MutationAddUserArgs } from "src/generated-models";

export default {
    Mutation: {
        addUser: (root: never, args: MutationAddUserArgs, { injector }: ModuleContext) => injector.get(UserProvider).addUser(args.addUserData)
    }
};