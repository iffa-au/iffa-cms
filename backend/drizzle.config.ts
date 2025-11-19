import {DB_URL} from "./src/config/env";

import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    out: './src/drizzle/migrations',
    schema: './src/drizzle/schema',
    dialect: 'postgresql',
    dbCredentials: {
        url: DB_URL!,
    },
    verbose: true,
    strict: true
});