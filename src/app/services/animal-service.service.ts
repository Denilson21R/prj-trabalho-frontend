import { Injectable } from '@angular/core';
import {globalConstants} from "../globalConstants";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Animal} from "../model/Animal";

@Injectable({
  providedIn: 'root'
})
export class AnimalServiceService {

  constructor(private http: HttpClient) { }

  baseURL = globalConstants.backendURL

  getUserAnimals(id_user: Number){
    return this.http.get<Animal[]>(this.baseURL + "/user/" + String(id_user) + "/animals", {observe: "response"})
  }

  addAnimal(animal: Animal){
    let newAnimal = new HttpParams();
    newAnimal = newAnimal.set("name", String(animal.name));
    newAnimal = newAnimal.set("description", String(animal.description));
    newAnimal = newAnimal.set("specie", String(animal.specie));
    newAnimal = newAnimal.set("owner", String(animal.owner.id));
    return this.http.post<Animal>(this.baseURL + "/animal", newAnimal, {observe: "response"})
  }

  updateAnimal(animal: Animal){
    let animalData = new HttpParams();
    animalData = animalData.set("name", String(animal.name));
    animalData = animalData.set("description", String(animal.description));
    animalData = animalData.set("status", String(this.getNumberForStatus(animal.status)));
    return this.http.put<Animal>(this.baseURL + "/animal/" + animal.id, animalData, {observe: "response"})
  }

  private getNumberForStatus(status: String) {
    if(status == "ATIVO"){
      return "0"
    }else{
      return "1"
    }
  }
}
