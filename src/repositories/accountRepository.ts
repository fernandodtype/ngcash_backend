import { ApppDataSource } from "../data-source";
import { Account } from "../entities/Accounts";

const accountRepository = ApppDataSource.getRepository(Account)

export default accountRepository