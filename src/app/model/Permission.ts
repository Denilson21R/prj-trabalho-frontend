import {User} from "./User";
import {Company} from "./Company";

export class Permission {
  id?: Number
  user!: User
  company!: Company
  can_add_schedules?: boolean
  can_add_services?: boolean
  company_owner!: boolean

  constructor(user: User, company: Company, can_add_schedules: boolean, can_add_services: boolean, company_owner: boolean) {
    this.user = user;
    this.company = company;
    this.can_add_schedules = can_add_schedules;
    this.can_add_services = can_add_services;
    this.company_owner = company_owner;
  }
}
