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
};
getEntreprise(entrepriseId:number):Observable<any>{
  return this._http.get(this.apiEntreprise + '/' + entrepriseId);
};


addClient(userMail:any):Observable<any>{
  return this._http.put(this.apiAdd,userMail)
};
removeClient(userMail:any):Observable<any>{
  return this._http.put(`${this.commonApi}entrepriseReload`,userMail)
};


};
