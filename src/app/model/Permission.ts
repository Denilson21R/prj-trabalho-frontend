import {User} from "./User";
import {Company} from "./Company";

export class Permission {
  id?: Number
  user!: User
  company!: Company
  can_login!: boolean
  can_add_schedules?: boolean
  can_add_services?: boolean
  company_owner!: boolean
}
