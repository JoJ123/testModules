import { Collection } from 'mongodb';
import { TeamDbObject } from 'src/generated-models';

export interface TeamModuleConfig {
    teamCollection: Collection<TeamDbObject>;
}
