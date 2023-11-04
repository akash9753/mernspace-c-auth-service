// import fs from "fs";
// import path from "path"
import { Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { RegisterUserRequest } from "../types";
import { UserService } from "../services/UserService";
import { Logger } from "winston";
import { JwtPayload } from "jsonwebtoken";
// import createHttpError from "http-errors";
// import { Config } from "../config";
// import { AppDataSource } from "../config/data-source";
// import { RefreshToken } from "../entity/RefreshToken";
import { TokenService } from "../services/TokenService";

export class AuthController {
    constructor(
        private userService: UserService,
        private logger: Logger,
        private tokenService: TokenService,
    ) {}
    async register(
        req: RegisterUserRequest,
        res: Response,
        next: NextFunction,
    ) {
        // Validation
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }
        const { firstName, lastName, email, password } = req.body;

        try {
            const user = await this.userService.create({
                firstName,
                lastName,
                email,
                password,
            });
            this.logger.info("User has been registerd", { id: user.id });

            // let privateKey: Buffer;

            // try {
            //     privateKey = fs.readFileSync(path.join(__dirname,"../../certs/private.pem"))
            // } catch(err){
            //     const error = createHttpError(
            //         500,
            //         "Error while reading private key",
            //     )
            //     next(error)
            //     return
            // }

            const payload: JwtPayload = {
                sub: String(user.id),
                role: user.role,
            };

            //  const accessToken = sign(payload , privateKey, {
            //     algorithm:"RS256",
            //     expiresIn:"1h",
            //     issuer:"auth-service",
            //  })

            const accessToken = this.tokenService.generateAccessToken(payload);

            //  const MS_IN_YEAR = 1000 * 60 * 60 * 365 // 1Y

            //  const refreshTokenRepository = AppDataSource.getRepository(RefreshToken)

            //  const newRefreshToken = await refreshTokenRepository.save({
            //     user: user,
            //     expiresAt: new Date(Date.now() + MS_IN_YEAR)
            //  })

            //  const refreshToken = sign(payload , Config.REFRESH_TOKEN_SECRET!, {
            //     algorithm:"HS256",
            //     expiresIn:"1y",
            //     issuer:"auth-service",
            //     jwtid: String(newRefreshToken.id)
            //  })

            const newRefreshToken =
                await this.tokenService.persistRefreshToken(user);

            const refreshToken = this.tokenService.generateRefreshToken({
                ...payload,
                id: String(newRefreshToken.id),
            });

            res.cookie("accessToken", accessToken, {
                domain: "localhost",
                sameSite: "strict",
                maxAge: 1000 * 60 * 60,
                httpOnly: true,
            });
            res.cookie("accessToken", refreshToken, {
                domain: "localhost",
                sameSite: "strict",
                maxAge: 1000 * 60 * 60 * 24 * 365,
                httpOnly: true,
            });

            res.status(201).json({ user: user });
        } catch (err) {
            next(err);
            return;
        }
    }
}
