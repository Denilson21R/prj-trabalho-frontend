import {User} from "./User";

export class Animal {
  id?: Number
  owner!: User
  name!: String
  specie!: String
  description!: String
  status!: String
}
