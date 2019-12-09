import { TeamDbObject } from "src/generated-models";

export default {
    Team: {
        id: (team: TeamDbObject) => team._id,
    },
};