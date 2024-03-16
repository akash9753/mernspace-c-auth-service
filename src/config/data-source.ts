import "reflect-metadata";
import { DataSource } from "typeorm";
import { Config } from ".";
// console.log(`Config.DB_HOST`,Config.DB_HOST);
// console.log(`DB_PORT`,Config.DB_PORT);
// console.log(`Config.DB_USERNAME`,Config.DB_USERNAME);
// console.log(`Config.DB_PASSWORD`,Config.DB_PASSWORD);
// console.log(`Config.DB_NAME`,Config.DB_NAME);

export const AppDataSource = new DataSource({
    type: "postgres",
    host: Config.DB_HOST,
    port: Number(Config.DB_PORT),
    username: Config.DB_USERNAME,
    password: Config.DB_PASSWORD,
    database: Config.DB_NAME,
    // Don't use this in production.
    // synchronize: Config.NODE_ENV === "test" || Config.NODE_ENV === "dev",
    synchronize: true,
    logging: false,
    entities: ["src/entity/*.{ts,js}"],
    migrations: ["src/migration/*.{ts,js}"],
    subscribers: [],
});
