import { ApppDataSource } from "../data-source";
import { User } from "../entities/User";

export const userRepository = ApppDataSource.getRepository(User)