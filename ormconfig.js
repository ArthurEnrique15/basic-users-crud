// [
//     {
//         "type": "postgres",
//         "port": 5432,
//         "host": "localhost",
//         "username": "1234",
//         "password": "1234",
//         "database": "database",
//         "migrations": ["./src/shared/infra/typeorm/migrations/*.ts"],
//         "entities": [
//             "./src/modules/**/infra/typeorm/entities/*.ts"
//         ],
//         "cli": {
//             "migrationsDir": "./src/shared/infra/typeorm/migrations/"
//         }
//     },
//     {
//         "type": "postgres",
//         "port": 5431,
//         "host": "localhost",
//         "username": "1234",
//         "password": "1234",
//         "database": "database_test",
//         "migrations": ["./src/shared/infra/typeorm/migrations/*.ts"],
//         "entities": [
//             "./src/modules/**/infra/typeorm/entities/*.ts"
//         ],
//         "cli": {
//             "migrationsDir": "./src/shared/infra/typeorm/migrations/"
//         }
//     }
// ]

require("dotenv/config");

// const dir = process.env.NODE_ENV === 'test' || process.env.TS_NODE_DEV ? 'src' : 'dist';
// const file = process.env.NODE_ENV === 'test' || process.env.TS_NODE_DEV ? 'ts' : 'js';
const database =
    process.env.NODE_ENV === "test"
        ? process.env.POSTGRES_DB_TEST
        : process.env.POSTGRES_DB_PROD;
const port = process.env.NODE_ENV === "test" ? 5432 : undefined;
const host = process.env.NODE_ENV === "test" ? "database_test" : undefined;

const config = {
    type: "postgres",
    host: host || process.env.POSTGRES_HOST,
    port: port || Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database,
    // entities: [`./${dir}/modules/**/infra/typeorm/entities/*.${file}`],
    // migrations: [`./${dir}/shared/infra/typeorm/migrations/*.${file}`],
    entities: [`./src/modules/**/infra/typeorm/entities/*.ts`],
    migrations: [`./src/shared/infra/typeorm/migrations/*.ts`],
    cli: {
        migrationsDir: `./src/shared/infra/typeorm/migrations/`,
    },
};

module.exports = config;
