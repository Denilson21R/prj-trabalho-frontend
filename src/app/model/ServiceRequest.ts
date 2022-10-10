import {User} from "./User";
import {Service} from "./Service";
import {Animal} from "./Animal";
import {Company} from "./Company";

export class ServiceRequest {
  id?: Number
  client!: User
  requested_services!: Service[]
  animal!: Animal
  company!: Company
  status!: String
  createdDate!: Date
  serviceDate!: Date
}
