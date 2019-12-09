import { ModuleContext } from "@graphql-modules/core";
import { UserProvider } from "./providers/user.provider";
import { UserDbObject } from "./config";

export default {
    Query: {
        user: (root, { id }: { id: string }, { injector }: ModuleContext) => injector.get(UserProvider).getUserById(id)
    },
    User: {
        id: (user: UserDbObject) => user._id,
    },
    Mutation: {
        addUser: (root: never, { username }: { username: string }, { injector }: ModuleContext) => injector.get(UserProvider).addUser(username)
    }
};