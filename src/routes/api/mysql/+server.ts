import mysql from 'mysql2/promise';

const dbConfig = {
    host: 'localhost',
    user: 'aurelius',
    database: 'mysql_showcase',
    password: 'heslo1234'
};

export async function GET(request: any) {
    const connection = await mysql.createConnection(dbConfig);

    const url = new URL(request.url);
    const action = url.searchParams.get('action');

    try {
        switch (action) {
            case '1':
                const name = `User_${Math.floor(Math.random() * 1000)}`;
                const email = `${name}@example.com`;
                await connection.execute('INSERT INTO showcase (name, email) VALUES (?, ?)', [name, email]);

                const [countRows]: any = await connection.execute('SELECT COUNT(*) AS count FROM showcase');
                if (countRows[0].count > 30) {
                    await connection.execute('DELETE FROM showcase ORDER BY id ASC LIMIT ?', [countRows[0].count - 1]);
                }
                break;
            case '2':
                const [rows]: any = await connection.execute('SELECT COUNT(*) AS count FROM showcase');
                if (rows[0].count <= 1) {
                    const [allRows] = await connection.execute('SELECT * FROM showcase');
                    await connection.end();
                    return new Response(JSON.stringify(allRows));
                }
                await connection.execute('DELETE FROM showcase ORDER BY id DESC LIMIT 1');
                break;
            case '0':
            default:
                break;
        }

        const [finalRows] = await connection.execute('SELECT * FROM showcase');
        await connection.end();
        return new Response(JSON.stringify(finalRows));
    } catch (error) {
        console.error('Error:', error);
        await connection.end();
        return new Response(JSON.stringify({ error: 'An error occurred' }), { status: 500 });
    }
}