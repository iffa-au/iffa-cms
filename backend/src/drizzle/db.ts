import {drizzle} from "drizzle-orm/node-postgres"
import {DB_URL} from "../config/env";

const db = drizzle(DB_URL!);

export default db;