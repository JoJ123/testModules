import { ModuleContext } from "@graphql-modules/core";
import { TeamProvider } from "./providers/team.provider";
import { TeamDbObject } from "./config";

export default {
    Query: {
        team: (root, { id }: { id: string }, { injector }: ModuleContext) => injector.get(TeamProvider).getTeamById(id)
    },
    Team: {
        id: (team: TeamDbObject) => team._id,
    },
    Mutation: {
        addTeam: (root: never, { name }: { name: string }, { injector }: ModuleContext) => injector.get(TeamProvider).addTeam(name)
    }
};