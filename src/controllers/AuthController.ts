// import { Request, Response } from "express";
// import { AppDataSource } from "../config/data-source";
// import { User } from "../entity/User";

// interface UserData{
//     firstName : string,

//     lastName: string,

//     email : string,

//     password : string
// }

// interface RegisterUserRequest extends Request {
//     body : UserData;
// }

// export class AuthController {
//     async register(req: RegisterUserRequest, res: Response) {
//         const {firstName, lastName, email, password} = req.body

//         const userRepository = AppDataSource.getRepository(User);

//         await userRepository.save({firstName, lastName, email, password})

//         res.status(201).json();
//     }
// }

import { Response, NextFunction } from "express";
import { RegisterUserRequest } from "../types";
import { UserService } from "../services/UserService";
import { Logger } from "winston";

export class AuthController {
    private userService: UserService;
    private logger: Logger;

    constructor(userService: UserService, logger: Logger) {
        this.userService = userService;
        this.logger = logger;
    }

    async register(
        req: RegisterUserRequest,
        res: Response,
        next: NextFunction,
    ) {
        const { firstName, lastName, email, password } = req.body;
        this.logger.debug("Now request to register a user", {
            firstName,
            lastName,
            email,
        });
        try {
            const user = await this.userService.create({
                firstName,
                lastName,
                email,
                password,
            });
            this.logger.info("User has been registered", { user });
            res.status(201).json({ user });
        } catch (err) {
            next(err);
            return;
        }
    }
}
