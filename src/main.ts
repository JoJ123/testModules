import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import { UserModule } from './modules/user';

const app = express();

app.use('/graphql', graphqlHTTP({
    schema: UserModule.schema,
    graphiql: true
}));
console.log("Test")

app.listen(3000)