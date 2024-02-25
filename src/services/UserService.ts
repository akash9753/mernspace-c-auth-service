// import { AppDataSource } from "../config/data-source";
// import { User } from "../entity/User";
// import { UserData } from "../types";

// export class UserService {

//     async create({firstName, lastName, email, password} : UserData) {
//         const userRepository = AppDataSource.getRepository(User);

//         await userRepository.save({firstName, lastName, email, password})
//     }
// }
//--------------------------------------------------------------------------
// import { Repository } from "typeorm";
// import { User } from "../entity/User";
// import { UserData } from "../types";

// export class UserService {
//     constructor(private userRepository: Repository<User>) {}

//     async create({ firstName, lastName, email, password }: UserData) {
//         await this.userRepository.save({ firstName, lastName, email, password });
//     }
// }
//---------------------------------------------------------------------------
import { Repository } from "typeorm";
import bcrypt from "bcrypt";
import { User } from "../entity/User";
import { UserData } from "../types";
import createHttpError from "http-errors";
import { Roles } from "../constants";

export class UserService {
    private userRepository: Repository<User>;

    constructor(userRepository: Repository<User>) {
        this.userRepository = userRepository;
    }

    async create({ firstName, lastName, email, password }: UserData) {
        const user = await this.userRepository.findOne({
            where: { email: email },
        });
        if (user) {
            const err = createHttpError(400, "Email is already exists!");
            throw err;
        }
        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        try {
            return await this.userRepository.save({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                role: Roles.CUSTOMER,
            });
        } catch (err) {
            const error = createHttpError(
                500,
                "Failed to store data in the database",
            );
            throw error;
        }
    }

    async findByEmail(email: string) {
        return await this.userRepository.findOne({
            where: {
                email,
            },
        });
    }

    async findById(id: number) {
        return await this.userRepository.findOne({
            where: {
                id,
            },
        });
    }
}
