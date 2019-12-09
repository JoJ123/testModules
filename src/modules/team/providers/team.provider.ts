import { Injectable, Inject } from '@graphql-modules/di';
import { ModuleConfig } from '@graphql-modules/core';
import { Collection, ObjectID } from 'mongodb';
import { TeamModuleConfig } from '../config';
import { TeamDbObject } from 'src/generated-models';
import { ensureObjectID } from 'src/modules/common-mongo/utils/ensure-object-id';
import moment = require('moment');
@Injectable()
export class TeamProvider {
    public collection: Collection<TeamDbObject>;
    constructor(@Inject(ModuleConfig) private config: TeamModuleConfig) {
        this.collection = this.config.teamCollection;
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
        const userIdObj = ensureObjectID(userId)
        const updateResult = await this.collection.updateOne({ _id: teamIdObj }, { $push: { members: userIdObj } });
        return updateResult.matchedCount > 0
    }

    async removeMember(teamId: ObjectID | string | undefined | null, userId: ObjectID | string | undefined | null) {
        const teamIdObj = ensureObjectID(teamId)
        const userIdObj = ensureObjectID(userId)
        const updateResult = await this.collection.updateOne({ _id: teamIdObj }, { $pull: { members: userIdObj } });
        return updateResult.matchedCount > 0
    }
}