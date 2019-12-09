import { Collection } from 'mongodb';
import { UserDbObject } from 'src/generated-models';

export interface UserModuleConfig {
    userCollection: Collection<UserDbObject>;
}
