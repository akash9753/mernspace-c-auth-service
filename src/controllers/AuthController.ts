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

import { Response } from "express";
import { RegisterUserRequest } from "../types";
import { UserService } from "../services/UserService";

export class AuthController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    async register(req: RegisterUserRequest, res: Response) {
        const { firstName, lastName, email, password } = req.body;

        await this.userService.create({ firstName, lastName, email, password });

        res.status(201).json();
    }
}
