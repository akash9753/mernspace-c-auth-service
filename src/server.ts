import app from "./app";
import { Config } from "./config";
import logger from "./config/logger";

const startServer = () => {
    const PORT = Config.PORT;
    try {
        app.listen(Config.PORT, () => logger.info(`Listning on port ${PORT}`));
    } catch (err: unknown) {
        if (err instanceof Error) {
            logger.info(err.message);
            process.exit(1);
        }
    }
};

startServer();
