import { ModuleContext } from "@graphql-modules/core";
import { MutationAddTeamArgs } from "src/generated-models";
import { TeamProvider } from "../providers/team.provider";

export default {
    Mutation: {
        addTeam: (root: never, args: MutationAddTeamArgs, { injector }: ModuleContext) => injector.get(TeamProvider).addTeam(args.name)
    }
};