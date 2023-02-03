import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {

  apiEntreprise:string = 'http://localhost:3000/entreprise'
  apiAdd:string = 'http://localhost:3000/entrepriseAddClient'

  constructor(private _http:HttpClient) { }

getOneEntreprise(id:number):Observable<any>{
  return this._http.get(this.apiEntreprise +'/'+ id);
}
getEntreprise(entrepriseId:number):Observable<any>{
  return this._http.get(this.apiEntreprise + '/' + entrepriseId);
};

updateEntreprise(id:any,email:any):Observable<any>{
  return this._http.put(`${this.apiEntreprise}/${id}`, email)
};
// On ajoute 1 au nb clients + 2min d'attente
addClient(userMail:any):Observable<any>{
  return this._http.put(this.apiAdd,userMail)
};

}
