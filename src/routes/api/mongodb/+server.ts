import { MongoClient } from 'mongodb';

const dbConfig = {
    url: 'mongodb://localhost:27017',
    dbName: 'mongodb_showcase'
};

export async function GET(request) {
    const client = new MongoClient(dbConfig.url);

    try {
        await client.connect();
        const db = client.db(dbConfig.dbName);
        const collection = db.collection('showcase');

        const url = new URL(request.url);
        const action = url.searchParams.get('action');

        switch (action) {
            case '1':
                const name = `User_${Math.floor(Math.random() * 1000)}`;
                const email = `${name}@example.com`;
                await collection.insertOne({ name, email });

                const count = await collection.countDocuments();
                if (count > 25) {
                    const excess = count - 1;
                    console.log(excess);
                    const oldestDocs = await collection.find().sort({ _id: 1 }).limit(excess).toArray();
                    const oldestIds = oldestDocs.map((doc: any) => doc._id);
                    await collection.deleteMany({ _id: { $in: oldestIds } });
                }
                break;
            case '2':
                const total = await collection.countDocuments();
                if (total > 1) {
                    const lastDoc = await collection.find().sort({ _id: -1 }).limit(1).next();
                    if (lastDoc) {
                        await collection.deleteOne({ _id: lastDoc._id });
                    }
                }
                break;
            case '0':
            default:
                break;
        }

        const finalRows = await collection.find().toArray();
        return new Response(JSON.stringify(finalRows));
    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ error: 'An error occurred' }), { status: 500 });
    } finally {
        await client.close();
    }
}