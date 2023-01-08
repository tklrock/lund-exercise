import mysql from "mysql2/promise"
require('dotenv').config()

export default async function executeQuery(query, values) { 
    const dbConnection = await mysql.createConnection({
        host: process.env.DATABASE_ENDPOINT,
        port: process.env.DATABASE_PORT,
        database: process.env.DATABASE_SCHEMA,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD  
    });
    
    try {
        const [data] = await dbConnection.execute(query,values);
        dbConnection.end();
        return data;
    } catch (error) {
        return error;
    }
}