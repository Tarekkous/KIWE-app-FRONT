import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar-right',
  templateUrl: './side-bar-right.component.html',
  styleUrls: ['./side-bar-right.component.scss']
})
export class SideBarRightComponent {
opened = false;
userFirstName!:any;
profilCords!:any;
constructor(private _route:Router){}

ngOnInit():void{

  //on récupère l'objet du user connecté pour l'affiché dans la barre du menu
console.log(JSON.parse(localStorage.getItem('profilCords') as any));
this.profilCords = JSON.parse(localStorage.getItem('profilCords') as any)
const userFirstName = this.profilCords.user_firstname
const userLastName = this.profilCords.user_lastname
}



onDisonnect(){
localStorage.clear()
this._route.navigate(['login'])
}
}
