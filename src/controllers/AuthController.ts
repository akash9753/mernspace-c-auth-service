// import fs from "fs";
// import path from "path";
import { NextFunction, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { RegisterUserRequest } from "../types";
import { UserService } from "../services/UserService";
import { Logger } from "winston";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
// import { Config } from "../config";
// import { AppDataSource } from "../config/data-source";
// import { RefreshToken } from "../entity/RefreshToken";
import { TokenService } from "../services/TokenService";
import { CredentialService } from "../services/CredentialService";

export class AuthController {
    constructor(
        private userService: UserService,
        private logger: Logger,
        private tokenService: TokenService,
        private credentialService: CredentialService,
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

        this.logger.debug("New request to register a user", {
            firstName,
            lastName,
            email,
            password: "******",
        });
        try {
            const user = await this.userService.create({
                firstName,
                lastName,
                email,
                password,
            });
            this.logger.info("User has been registered", { id: user.id });

            // let privateKey: Buffer;
            // try {
            //     privateKey = fs.readFileSync(
            //         path.join(__dirname, "../../certs/private.pem"),
            //     );
            // } catch (err) {
            //     const error = createHttpError(
            //         500,
            //         "Error while reading private key",
            //     );
            //     next(error);
            //     return;
            // }

            const payload: JwtPayload = {
                sub: String(user.id),
                role: user.role,
            };

            // const accessToken = sign(payload, privateKey, {
            //     algorithm: "RS256",
            //     expiresIn: "1h",
            //     issuer: "auth-service",
            // });
            const accessToken = this.tokenService.generateAccessToken(payload);

            //Persist the refresh token
            const newRefreshToken =
                await this.tokenService.persistRefreshToken(user);

            // const MS_IN_YEAR = 1000 * 60 * 60 * 24 * 365; //1Y
            // const refreshTokenRepository =
            //     AppDataSource.getRepository(RefreshToken);

            // const newRefreshToken = await refreshTokenRepository.save({
            //     user: user,
            //     expiresAt: new Date(Date.now() + MS_IN_YEAR),
            // });

            // const refreshToken = sign(payload, Config.REFRESH_TOKEN_SECRET!, {
            //     algorithm: "HS256",
            //     expiresIn: "1y",
            //     issuer: "auth-service",
            //     jwtid: String(newRefreshToken.id)
            // });

            const refreshToken = this.tokenService.generateRefreshToken({
                ...payload,
                id: String(newRefreshToken.id),
            });

            res.cookie("accessToken", accessToken, {
                domain: "localhost",
                sameSite: "strict",
                maxAge: 1000 * 60 * 60, // 1h
                httpOnly: true, // Very important
            });

            res.cookie("refreshToken", refreshToken, {
                domain: "localhost",
                sameSite: "strict",
                maxAge: 1000 * 60 * 60 * 24 * 365, // 1y
                httpOnly: true, // Very important
            });

            res.status(201).json({ id: user.id });
        } catch (err) {
            next(err);
            return;
        }
    }

    async login(req: RegisterUserRequest, res: Response, next: NextFunction) {
        // Validation
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }
        const { email, password } = req.body;

        this.logger.debug("New request to login a user", {
            email,
            password: "******",
        });

        //Check if username (email) exist in database

        //Compare password

        //Genearte tokens

        //Add tokens to cookies

        //Return the response (id)
        try {
            const user = await this.userService.findByEmail(email);
            if (!user) {
                const error = createHttpError(
                    400,
                    "Email or password does not match.",
                );
                next(error);
                return;
            }

            const passwordMatch = await this.credentialService.comparePassword(
                password,
                user.password,
            );

            if (!passwordMatch) {
                const error = createHttpError(
                    400,
                    "Email or password does not match.",
                );
                next(error);
                return;
            }

            const payload: JwtPayload = {
                sub: String(user.id),
                role: user.role,
            };

            const accessToken = this.tokenService.generateAccessToken(payload);

            // Persist the refresh token
            const newRefreshToken =
                await this.tokenService.persistRefreshToken(user);

            const refreshToken = this.tokenService.generateRefreshToken({
                ...payload,
                id: String(newRefreshToken.id),
            });

            res.cookie("accessToken", accessToken, {
                domain: "localhost",
                sameSite: "strict",
                maxAge: 1000 * 60 * 60, // 1h
                httpOnly: true, // Very important
            });

            res.cookie("refreshToken", refreshToken, {
                domain: "localhost",
                sameSite: "strict",
                maxAge: 1000 * 60 * 60 * 24 * 365, // 1y
                httpOnly: true, // Very important
            });

            this.logger.info("User has been logged in", { id: user.id });
            res.status(201).json({ id: user.id });
        } catch (err) {
            next(err);
            return;
        }
    }
}
