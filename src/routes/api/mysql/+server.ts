import mysql from 'mysql2/promise';

const dbConfig = {
    host: 'localhost',
    user: 'aurelius',
    database: 'mysql_showcase',
    password: 'heslo1234'
};

export async function GET(request: any) {
    const connection = await mysql.createConnection(dbConfig);
    let query = '';

    const url = new URL(request.url);
    const action = url.searchParams.get('action');

    switch (action) {
        case '1':
            const name = `User_${Math.floor(Math.random() * 1000)}`;
            const email = `${name}@example.com`;
            query = 'INSERT INTO showcase (name, email) VALUES (?, ?)';
            await connection.execute(query, [name, email]);
            break;
        case '2':
            const [rows]: any = await connection.execute('SELECT COUNT(*) AS count FROM showcase');
            if (rows[0].count <= 1) {
                const [rows] = await connection.execute('SELECT * FROM showcase');
                await connection.end();
                return new Response(JSON.stringify(rows));
            }
            query = 'DELETE FROM showcase ORDER BY id DESC LIMIT 1';
            await connection.execute(query);
            break;
        case '0':
        default:
            query = 'SELECT * FROM showcase';
            break;
    }

    const [rows] = await connection.execute('SELECT * FROM showcase');
    await connection.end();

    return new Response(JSON.stringify(rows));
}
