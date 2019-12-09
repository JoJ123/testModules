import { Injectable, Inject } from '@graphql-modules/di';
import { ModuleConfig } from '@graphql-modules/core';
import { Collection } from 'mongodb';
import { UserDbObject, UserModuleConfig } from '../config';

@Injectable()
export class UserProvider {
    public collection: Collection<UserDbObject>;
    constructor(@Inject(ModuleConfig) private config: UserModuleConfig) {
        this.collection = this.config.userCollection;
    }

    async getUserById(id) {
        const user = await this.collection.findOne({ _id: id });
        if (!user) {
            throw new Error(`User with the id ${id} was not found!`)
        }
        return user
    }

    async addUser(username) {
        const insertResult = await this.collection.insertOne({ username });
        return this.collection.findOne({ _id: insertResult.insertedId });
    }
}