import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  adminStatut!:any
  constructor(private _userService:UserService, private _snackbar:MatSnackBar, private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     this.adminStatut = this._userService.getStatutAdmin()
     console.log(this.adminStatut);
      if (this.adminStatut === 'commerçant') {
    return true;

      }else {
        this._snackbar.open('vous devez être Admin pour accéder à cette page', 'ok' ,{verticalPosition:'top'})
        return this.router.navigate(['/logAdmin']);

      }
  }


}
