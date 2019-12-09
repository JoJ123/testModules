
import { Db, MongoClient } from 'mongodb';
import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import { UserModule } from './modules/user';
import { initAppModule } from './app-module';

export async function initServer() {
    const connection = await MongoClient.connect("mongodb://localhost:27018".split('==').join('%3D%3D'), { useNewUrlParser: true });
    const db: Db = connection.db("digital-services123");

    const app = express();

    const { schemaAsync, injector } = await initAppModule({ db });

    const schema = await schemaAsync;
    app.use('/graphql', graphqlHTTP({
        schema,
        graphiql: true
    }));

    app.listen(4001)
}
