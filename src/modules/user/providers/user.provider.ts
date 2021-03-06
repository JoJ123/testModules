import { Injectable, Inject } from '@graphql-modules/di';
import { ModuleConfig } from '@graphql-modules/core';
import { Collection, ObjectID } from 'mongodb';
import { UserModuleConfig } from '../config';
import { UserDbObject, AddUserInput } from 'src/generated-models';
import { ensureObjectID } from 'src/modules/common-mongo/utils/ensure-object-id';
import moment = require('moment');
import { addCollectionItem } from 'src/modules/common-mongo/utils/add-collection-item';
import { ProviderEvent } from 'src/modules/common/provider-event';

@Injectable()
export class UserProvider {
    public collection: Collection<UserDbObject>;

    private deleteUserEvent = new ProviderEvent<{ userId: ObjectID }>();
    public onDeleteUser = this.deleteUserEvent.register;

    constructor(@Inject(ModuleConfig) private config: UserModuleConfig) {
        this.collection = this.config.userCollection;
    }

    async getUserById(id: ObjectID | string | undefined | null) {
        const idObj = ensureObjectID(id)
        const user = await this.collection.findOne({ _id: idObj });
        if (!user) {
            throw new Error(`User with the id ${id} was not found!`)
        }
        return user
    }

    async getUserByIds(ids: Array<ObjectID | string | undefined | null>) {
        const idObjs = ids.map(id => ensureObjectID(id))
        return await this.collection.find({ _id: { $in: idObjs } }).toArray();
    }

    async getUserList() {
        return this.collection.find({}).toArray();
    }

    async addUser(userInput: AddUserInput) {
        const profile = {
            givenName: userInput.givenName,
            familyName: userInput.familyName,
            name: `${userInput.givenName} ${userInput.familyName}`,
            email: userInput.email
        }
        const insertResult = await addCollectionItem<UserDbObject>(this.collection, { profile, createdAt: moment().toDate() })
        return this.collection.findOne({ _id: insertResult.insertedId });
    }

    async removeUser(id: ObjectID | string | undefined | null) {
        const idObj = ensureObjectID(id)
        const removeResult = await this.collection.deleteOne({ _id: idObj });
        if (removeResult.deletedCount > 0) {
            await this.deleteUserEvent.trigger({ userId: idObj })
            return true;
        }
        return false
    }
}