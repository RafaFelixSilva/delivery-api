import postgres from "postgres";

const sql = postgres({
    host: 'localhost',
    port: '5432',
    database: 'delivery',
    username: 'postgres',
    password: 'root'
})

export default sql