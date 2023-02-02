import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _userService:UserService, private _snackbar:MatSnackBar, private router:Router){}
token!:any
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const token = this._userService.getToken();
      // this._userService.getMyToken().subscribe((data:any)=>{
      //   console.log(data);
      //   this.token = data
      // });
      console.log(token);
      if (token) {
        return true;
      } else {
        this._snackbar.open('vous devez être authentifié pour accéder à cette page', 'ok' ,{verticalPosition:'top'})
        return this.router.navigate(['login']);
      }





  }
}
