import app from "./app";
import { Config } from "./config";
import { AppDataSource } from "./config/data-source";
import logger from "./config/logger";

const startServer = async () => {
    const PORT = Config.PORT;
    try {
        await AppDataSource.initialize();
        logger.info("Database connected successfully");
        app.listen(Config.PORT, () => logger.info(`Listning on port ${PORT}`));
    } catch (err: unknown) {
        if (err instanceof Error) {
            logger.info(err.message);
            setTimeout(() => {
                process.exit(1);
            });
        }
    }
};

void startServer();
