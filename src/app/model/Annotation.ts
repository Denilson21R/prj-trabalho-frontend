import {User} from "./User";
import {Schedule} from "./Schedule";

export class Annotation {
  id?: Number
  text!: String
  writer!: User
  date!: Date
  schedule!: Schedule
}
