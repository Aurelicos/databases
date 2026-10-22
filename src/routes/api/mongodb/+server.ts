import { MongoClient } from 'mongodb';

const MAX_ITEMS = 50;
let pending = Promise.resolve();

function mongoUrl() {
    const user = process.env.MONGODB_USER;
    const password = process.env.MONGODB_PASSWORD;
    if (user && password) {
        return `mongodb://${encodeURIComponent(user)}:${encodeURIComponent(password)}@mongodb:27017/?authSource=admin`;
    }
    return process.env.MONGODB_URL ?? 'mongodb://localhost:27017';
}

const dbConfig = {
    url: mongoUrl(),
    dbName: process.env.MONGODB_DATABASE ?? 'mongodb_showcase'
};

export async function GET(request: any) {
    const previous = pending;
    let release!: () => void;
    pending = new Promise<void>((resolve) => { release = resolve; });
    await previous;
    try {
        return await handleRequest(request);
    } finally {
        release();
    }
}

async function handleRequest(request: any) {
    const client = new MongoClient(dbConfig.url, { serverSelectionTimeoutMS: 5000 });

    try {
        await client.connect();
        const db = client.db(dbConfig.dbName);
        const collection = db.collection('showcase');

        if (await collection.countDocuments() === 0) {
            await collection.insertOne({ name: 'User_0', email: 'User_0@example.com' });
        }

        const url = new URL(request.url);
        const action = url.searchParams.get('action');

        switch (action) {
            case '1':
                const name = `User_${Math.floor(Math.random() * 1000)}`;
                const email = `${name}@example.com`;
                await collection.insertOne({ name, email });

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

        const oldestDocs = await collection.find({}, { projection: { _id: 1 } })
            .sort({ _id: -1 }).skip(MAX_ITEMS).toArray();
        if (oldestDocs.length) {
            await collection.deleteMany({ _id: { $in: oldestDocs.map((doc) => doc._id) } });
        }
        const finalRows = await collection.find().sort({ _id: 1 }).toArray();
        return new Response(JSON.stringify(finalRows));
    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ error: 'An error occurred' }), { status: 500 });
    } finally {
        await client.close();
    }
}
