import {User} from "./User";
import {Company} from "./Company";

export class CompanyInvite {
  id?: Number
  employee!: User
  company!: Company
  status!: String
}
