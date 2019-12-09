import { Injectable, Inject } from '@graphql-modules/di';
import { ModuleConfig, OnInit } from '@graphql-modules/core';
import { Collection, ObjectID } from 'mongodb';
import { TeamModuleConfig } from '../config';
import { TeamDbObject } from 'src/generated-models';
import { ensureObjectID } from 'src/modules/common-mongo/utils/ensure-object-id';
import moment = require('moment');
import { UserProvider } from 'src/modules/user/providers/user.provider';
@Injectable()
export class TeamProvider implements OnInit {
    public collection: Collection<TeamDbObject>;
    constructor(@Inject(ModuleConfig) private config: TeamModuleConfig, private userProvider: UserProvider) {
        this.collection = this.config.teamCollection;
    }

    onInit() {
        this.userProvider.onDeleteUser(async ({ userId }) => {
            await this.removeMemberFromTeams(userId)
        })
    }

    async getTeamById(id: ObjectID | string | undefined | null) {
        const idObj = ensureObjectID(id)
        const user = await this.collection.findOne({ _id: idObj });
        if (!user) {
            throw new Error(`Team with the id ${id} was not found!`)
        }
        return user
    }

    async getTeamList() {
        return this.collection.find({}).toArray();
    }

    async addTeam(teamName) {
        const insertResult = await this.collection.insertOne({ name: teamName, createdAt: moment().toDate() });
        return this.collection.findOne({ _id: insertResult.insertedId });
    }

    async addMember(teamId: ObjectID | string | undefined | null, userId: ObjectID | string | undefined | null) {
        const teamIdObj = ensureObjectID(teamId)
        const user = await this.userProvider.getUserById(userId);
        const updateResult = await this.collection.updateOne({ _id: teamIdObj }, { $addToSet: { members: user._id } });
        return updateResult.matchedCount > 0
    }

    async removeMember(teamId: ObjectID | string | undefined | null, userId: ObjectID | string | undefined | null) {
        const teamIdObj = ensureObjectID(teamId)
        const userIdObj = ensureObjectID(userId)
        const updateResult = await this.collection.updateOne({ _id: teamIdObj }, { $pull: { members: userIdObj } });
        return updateResult.matchedCount > 0
    }

    async removeMemberFromTeams(userId: ObjectID | string | undefined | null) {
        const userIdObj = ensureObjectID(userId)
        const updateResult = await this.collection.updateOne({ members: userIdObj }, { $pull: { members: userIdObj } });
        return updateResult.matchedCount > 0
    }
}