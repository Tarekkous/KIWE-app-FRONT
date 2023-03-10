import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
commonApi:string= 'http://localhost:3000/'

  constructor(private _http: HttpClient) {

  }


// méthode pour récupérer et afficher tout les clients de l'entreprise
getAllClients(id:any):Observable<any>{
  return this._http.get(`${this.commonApi}clients/${id}`)
}
// Admin method login ***********
postLoginAdmin(admin:any):Observable<any>{
  return this._http.post(`${this.commonApi}loginAdmin`,admin)
}
//récupérer le statut de l'admin afin d'assurer une connexion sécurisée
getStatutAdmin(){
  const adminStatut = JSON.parse(localStorage.getItem('adminStatut')as any)
  if(adminStatut){
    return adminStatut
  }
  return null
}

// enlever -2min de temps d'attente de l'entreprise après avoir dissocier l'utilisateur
reduceTimeCompany(id:any):Observable<any>{
  return this._http.put(`${this.commonApi}company/${id}`,id)
  }
// enlever la position de l'utilisateur retiré par l'admin
removePosition(mail:any):Observable<any>{
  return this._http.put(`${this.commonApi}posClient`,mail)
}

};

