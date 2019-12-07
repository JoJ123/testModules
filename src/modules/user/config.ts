import { Collection, ObjectID } from 'mongodb';

export type UserDbObject = {
    _id: ObjectID
    username: string
}

export interface UserModuleConfig {
    userCollection: Collection<UserDbObject>;
}
