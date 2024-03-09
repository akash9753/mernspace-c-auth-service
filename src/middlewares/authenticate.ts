import { expressjwt, GetVerificationKey } from "express-jwt";
import { Request } from "express";
import jwksClient from "jwks-rsa";
import { Config } from "../config";

// console.log(`Config.JWKS_URI!`,Config.JWKS_URI!);

export default expressjwt({
    secret: jwksClient.expressJwtSecret({
        jwksUri: Config.JWKS_URI!,
        cache: true,
        rateLimit: true,
    }) as GetVerificationKey,
    algorithms: ["RS256"],
    getToken(req: Request) {
        // console.log(`authenticate.ts req.headers.authorization`,req.headers.authorization);
        const authHeader = req.headers.authorization;
        // console.log(`req.headers ********************`,req.headers);

        // Bearer eyjllsdjfljlasdjfljlsadjfljlsdf
        if (authHeader && authHeader.split(" ")[1] !== "undefined") {
            const token = authHeader.split(" ")[1];
            if (token) {
                // console.log(`authenticate.ts token`,token);
                return token;
            }
        }

        type AuthCookie = {
            accessToken: string;
        };

        const { accessToken } = req.cookies as AuthCookie;
        // console.log(`authenticate.ts accessToken`,accessToken);

        return accessToken;
    },
});
