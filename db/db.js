import sqlite3 from "sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "db", "database.sqlite");

console.log("DB PATH:", dbPath);

const db = new sqlite3.Database(dbPath);

export default db;