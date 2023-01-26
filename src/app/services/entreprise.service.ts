import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {

  apiEntreprise:string = 'http://localhost:3000/entreprise'
  constructor(private _http:HttpClient) { }

getEntreprise(entrepriseId:number):Observable<any>{
  return this._http.get(this.apiEntreprise + '/' + entrepriseId);
};
updateEntreprise(id:any,email:any):Observable<any>{
  return this._http.put(`${this.apiEntreprise}/${id}`, email)
};
}
