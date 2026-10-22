import mysql from 'mysql2/promise';

const MAX_ITEMS = 50;
let pending = Promise.resolve();

const dbConfig = {
    host: process.env.MYSQL_HOST ?? 'localhost',
    user: process.env.MYSQL_USER ?? 'aurelius',
    database: process.env.MYSQL_DATABASE ?? 'mysql_showcase',
    password: process.env.MYSQL_PASSWORD ?? ''
};

export async function GET(request: any) {
    // This deployment runs one app process; serialize writes to keep the cap exact.
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
    let connection: mysql.Connection | undefined;
    try {
        connection = await mysql.createConnection(dbConfig);

        const url = new URL(request.url);
        const action = url.searchParams.get('action');

        switch (action) {
            case '1':
                const name = `User_${Math.floor(Math.random() * 1000)}`;
                const email = `${name}@example.com`;
                await connection.execute('INSERT INTO showcase (name, email) VALUES (?, ?)', [name, email]);

                break;
            case '2':
                const [rows]: any = await connection.execute('SELECT COUNT(*) AS count FROM showcase');
                if (rows[0].count <= 1) {
                    const [allRows] = await connection.execute('SELECT * FROM showcase');
                    return new Response(JSON.stringify(allRows));
                }
                await connection.execute('DELETE FROM showcase ORDER BY id DESC LIMIT 1');
                break;
            case '0':
            default:
                break;
        }

        const [countRows]: any = await connection.execute('SELECT COUNT(*) AS count FROM showcase');
        if (countRows[0].count > MAX_ITEMS) {
            await connection.query('DELETE FROM showcase ORDER BY id ASC LIMIT ?', [countRows[0].count - MAX_ITEMS]);
        }
        const [finalRows] = await connection.execute('SELECT * FROM showcase ORDER BY id ASC');
        return new Response(JSON.stringify(finalRows));
    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ error: 'An error occurred' }), { status: 500 });
    } finally {
        await connection?.end();
    }
}
