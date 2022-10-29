import {User} from "./User";
import {Service} from "./Service";
import {Animal} from "./Animal";
import {Company} from "./Company";

export class Schedule{
  id?: Number
  date!: Date
  employee_schedule!: User
  service!: Service[]
  animal!: Animal
  status!: String
  paid!: boolean
  amount!: Number
  company!: Company
}
