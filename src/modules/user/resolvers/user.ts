import { UserDbObject } from "src/generated-models";

export default {
    User: {
        id: (user: UserDbObject) => user._id,
    },
};