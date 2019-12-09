import { ModuleContext } from "@graphql-modules/core";
import { TeamProvider } from "../providers/team.provider";
import { QueryTeamArgs } from "src/generated-models";

export default {
    Query: {
        team: (root, args: QueryTeamArgs, { injector }: ModuleContext) => injector.get(TeamProvider).getTeamById(args.id)
    },
};