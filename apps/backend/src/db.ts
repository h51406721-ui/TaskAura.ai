// SQLite connection and Drizzle ORM setup
import Database from 'better-sqlite3';
// import { drizzle } from 'drizzle-orm/better-sqlite3'; // Uncomment if using drizzle-orm

const db = new Database('mindforge.sqlite');

// Optionally, set up drizzle ORM
// const orm = drizzle(db);

export default db;
// export { orm }; // Uncomment if using drizzle-orm
