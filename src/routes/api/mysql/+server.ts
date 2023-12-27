import mysql from 'mysql2/promise';

const dbConfig = {
    host: 'localhost',
    user: 'aurelius',
    database: 'mysql_showcase',
    password: 'heslo1234'
};

export async function GET(request: any) {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT * FROM showcase');
    await connection.end();

    return new Response(JSON.stringify(rows));
}