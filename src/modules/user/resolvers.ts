import { Injectable } from '@graphql-modules/di';

@Injectable()
export class UserProvider {
    users = [
        {
            _id: '0',
            username: 'JoJ123'
        }
    ];
    getUserById(id) {
        return this.users.find(user => user._id === id);
    }
}

export default {
    Query: {
        user: (root, { id }, { injector }) => injector.get(UserProvider).getUserById(id)
    },
    User: {
        id: user => user._id,
        username: user => user.username
    }
};