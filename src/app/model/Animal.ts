import {User} from "./User";

export interface Animal {
  id?: Number
  owner: User
  name: String
  specie: String
  description: String
}
