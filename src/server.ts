
import { Db, MongoClient } from 'mongodb';
import { initAppModule } from './app-module';
import { ApolloServer } from 'apollo-server';

export async function initServer() {
    const connection = await MongoClient.connect("mongodb://localhost:27018".split('==').join('%3D%3D'), { useNewUrlParser: true });
    const db: Db = connection.db("digital-services123");

    const { schemaAsync, injector } = await initAppModule({ db });
    const schema = await schemaAsync;

    const server = new ApolloServer({
        schema,
        context: session => session
    });

    server.listen(4001).then(({ url }) => {
        console.log(`🚀  Server ready at ${url}`);
    });
}

// Remaining:
// - Hook delete user --> Remove from team
// - Authorization
// - Deployment
// - Docker it!
// - Kubernates

