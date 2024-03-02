import { config } from "dotenv";
import path from "path";

const configPath = path.resolve(
    __dirname,
    `../../.env.${process.env.NODE_ENV || "dev"}`,
);
// console.log(`configPath`,configPath);

config({ path: configPath });

const {
    PORT,
    NODE_ENV,
    DB_HOST,
    DB_PORT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME,
    REFRESH_TOKEN_SECRET,
    JWKS_URI,
    PRIVATE_KEY,
} = process.env;

export const Config = {
    PORT,
    NODE_ENV,
    DB_HOST,
    DB_PORT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME,
    REFRESH_TOKEN_SECRET,
    JWKS_URI,
    PRIVATE_KEY,
};
