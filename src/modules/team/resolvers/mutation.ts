import { ModuleContext } from "@graphql-modules/core";
import { MutationAddTeamArgs, MutationAddMemberArgs, MutationRemoveMemberArgs } from "src/generated-models";
import { TeamProvider } from "../providers/team.provider";

export default {
    Mutation: {
        addTeam: (root: never, args: MutationAddTeamArgs, { injector }: ModuleContext) => injector.get(TeamProvider).addTeam(args.name),
        addMember: (root: never, args: MutationAddMemberArgs, { injector }: ModuleContext) => injector.get(TeamProvider).addMember(args.teamId, args.userId),
        removeMember: (root: never, args: MutationRemoveMemberArgs, { injector }: ModuleContext) => injector.get(TeamProvider).removeMember(args.teamId, args.userId)
    }
};