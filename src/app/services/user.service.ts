import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  profilCords= new Subject<any>()
  myToken =  new Subject<any>()
  commonApi:string='http://localhost:3000/'
  userApi:string='http://localhost:3000/user'
  loginApi:string='http://localhost:3000/login'
  constructor(private _http:HttpClient) { }

getOneUser(id:any):Observable<any>{
 return  this._http.get(this.userApi + '/' + id)
}
getAllUsers():Observable<any>{
  return this._http.get(this.userApi)
}
updateUser(id:any,user:any):Observable<any>{
  return this._http.put(`${this.userApi}/${id}`,user)
}
deleteUser(id:any):Observable<any>{
  return this._http.delete(`${this.userApi}/${id}`)
}
postLogin(user:any):Observable<any>{
  return this._http.post(this.loginApi,user)
}
// Admin method login ***********
postLoginAdmin(admin:any):Observable<any>{
  return this._http.post(`${this.commonApi}loginAdmin`,admin)
}
postRegister(user:any):Observable<any>{
  return this._http.post(this.userApi,user)
}
//récupérer le statut de l'admin
getStatutAdmin(){
  const adminStatut = JSON.parse(localStorage.getItem('adminStatut')as any)
  if(adminStatut){
    return adminStatut
  }
  return null
}
//récupérer le statut du client
getStatutClient(){
  const statutClient = JSON.parse(localStorage.getItem('profilCords')as any)
  if(statutClient){
    return statutClient
  }
  return null
}
//!1ere méthode pour récupérer le token (localstorage)
getToken(){
 const token = localStorage.getItem('Token')
 if (token) {
  return token
 }
 return null
};
//!1ere méthode pour récupérer le token (Subject)

getMyToken():Observable<any>{
  const tkn = localStorage.getItem('Token')
  this.myToken.next(tkn)
  return this.myToken.asObservable()
}
//!méthode pour récupérer les coordonnées de user quand il se connecte
// et au lieu de les récupérer du local storage direct , on les envoie
// avec le subject afin de ne pas avoir des problemes pour la version mobile
getProfilCords():Observable<any>{
  const profilCords = localStorage.getItem('profilCords')
  this.profilCords.next(profilCords)
  return this.profilCords.asObservable()
}


//! on associe le user à l'entreprise consulté
associateUser(nom_entreprise:any,user_mail:any):Observable<any>{
  return this._http.put(this.userApi,{ nom_entreprise, user_mail })
};

//!on ajoute une position au user
addPos(userMail:any):Observable<any>{
  return this._http.put(`${this.commonApi}addPos`, userMail)
};

// !on dissocie l'utilisateur de l'entreprise
dissociateUser(userMail:any):Observable<any>{
  return this._http.put(`${this.commonApi}userDissociate`, userMail)
}
};
