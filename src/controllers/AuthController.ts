import { Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { RegisterUserRequest } from "../types";
import { UserService } from "../services/UserService";
import { Logger } from "winston";
import { JwtPayload } from "jsonwebtoken";
import { TokenService } from "../services/TokenService";
import createHttpError from "http-errors";
import { CredentialService } from "../services/CredentialService";

export class AuthController {
    constructor(
        private userService: UserService,
        private logger: Logger,
        private tokenService: TokenService,
        private credentialService: CredentialService
    ) { }
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

            const payload: JwtPayload = {
                sub: String(user.id),
                role: user.role,
            };


            const accessToken = this.tokenService.generateAccessToken(payload);


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
    async login(
        req: RegisterUserRequest,
        res: Response,
        next: NextFunction,
    ) {
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

        try {
            const user = await this.userService.findbyEmail(email);
            //1.check user available or not
            if (!user) {
                const error = createHttpError(400, "Email or password does not match")
                next(error)
                return;
            }
            //2.check passord
            const passwordMatch = await this.credentialService.comparePassword(
                password,
                user.password
            )
            if (!passwordMatch) {
                const error = createHttpError(400, "Email or password does not match")
                next(error)
                return;
            }
            const payload: JwtPayload = {
                sub: String(user.id),
                role: user?.role
            }


            const accessToken = this.tokenService.generateAccessToken(payload);


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
