import {User} from "./User";

export class Company {
  id?: Number
  user_create!: User
  email!: String
  company_name!: String
  cnpj?: String
  status!: String
}
