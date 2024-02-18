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
import { User } from "../entity/User";
import { UserData } from "../types";

export class UserService {
    private userRepository: Repository<User>;

    constructor(userRepository: Repository<User>) {
        this.userRepository = userRepository;
    }

    async create({ firstName, lastName, email, password }: UserData) {
        await this.userRepository.save({
            firstName,
            lastName,
            email,
            password,
        });
    }
}
