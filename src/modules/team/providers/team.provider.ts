import { Injectable, Inject } from '@graphql-modules/di';
import { ModuleConfig } from '@graphql-modules/core';
import { Collection } from 'mongodb';
import { TeamModuleConfig, TeamDbObject } from '../config';
@Injectable()
export class TeamProvider {
    public collection: Collection<TeamDbObject>;
    constructor(@Inject(ModuleConfig) private config: TeamModuleConfig) {
        this.collection = this.config.teamCollection;
    }

    async getTeamById(id) {
        const user = await this.collection.findOne({ _id: id });
        if (!user) {
            throw new Error(`Team with the id ${id} was not found!`)
        }
        return user
    }

    async addTeam(teamName) {
        const insertResult = await this.collection.insertOne({ name: teamName });
        return this.collection.findOne({ _id: insertResult.insertedId });
    }
}