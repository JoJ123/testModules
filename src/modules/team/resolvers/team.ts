import { TeamDbObject } from "src/generated-models";
import { ModuleContext } from "@graphql-modules/core";
import { UserProvider } from "src/modules/user/providers/user.provider";

export default {
    Team: {
        id: (team: TeamDbObject) => team._id,
        members: (team: TeamDbObject, args: any, { injector }: ModuleContext) =>
            injector.get(UserProvider).getUserByIds(team.members || []),
    },
};