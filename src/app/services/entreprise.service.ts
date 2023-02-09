import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {
  commonApi:string= 'http://localhost:3000/'
  apiEntreprise:string = 'http://localhost:3000/entreprise'
  apiAdd:string = 'http://localhost:3000/entrepriseAddClient'

  constructor(private _http:HttpClient) { }

getOneEntreprise(id:number):Observable<any>{
  return this._http.get(this.apiEntreprise +'/'+ id);
}
getEntreprise(entrepriseId:number):Observable<any>{
  return this._http.get(this.apiEntreprise + '/' + entrepriseId);
};


// On ajoute 1 au nb clients + 2min d'attente
addClient(userMail:any):Observable<any>{
  return this._http.put(this.apiAdd,userMail)
};

// On enlève 1 au nb clients - 2min d'attente
removeClient(userMail:any):Observable<any>{
  return this._http.put(`${this.commonApi}entrepriseReload`,userMail)
}


};
