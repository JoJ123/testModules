import { Collection, ObjectID } from 'mongodb';

export type TeamDbObject = {
    _id: ObjectID
    name: string
}

export interface TeamModuleConfig {
    teamCollection: Collection<TeamDbObject>;
}
