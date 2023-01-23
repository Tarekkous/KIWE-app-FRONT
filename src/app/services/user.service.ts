import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userApi:string='http://localhost:3000/user'
  loginApi:string='http://localhost:3000/login'
  constructor(private _http:HttpClient) { }

getOneUser(id:any):Observable<any>{
 return  this._http.get(this.userApi + '/' + id)
}
getAllUsers():Observable<any>{
  return this._http.get(this.userApi)
}
postLogin(user:any):Observable<any>{
  return this._http.post(this.loginApi,user)
}
postRegister(user:any):Observable<any>{
  return this._http.post(this.userApi,user)
}
getToken(){
 const token = localStorage.getItem('Token')
 if (token) {
  return token
 }
 return null
}

}
