import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-side-bar-right',
  templateUrl: './side-bar-right.component.html',
  styleUrls: ['./side-bar-right.component.scss']
})
export class SideBarRightComponent {
opened = false;
tkn!:any
// userFirstName!:any;
profilCords!:any;
constructor(private _route:Router,private _userService:UserService){}

ngOnInit():void{

  //on récupère l'objet du user connecté pour l'afficher dans la barre du menu
//!on récupére le profilCords via localStorage

// console.log(JSON.parse(localStorage.getItem('profilCords') as any));
// this.profilCords = JSON.parse(localStorage.getItem('profilCords') as any)
// const userFirstName = this.profilCords.user_firstname
// const userLastName = this.profilCords.user_lastname

//!on récupére le profilCords via un subject (erreur console lors de l'affichage à résoudre)
this._userService.getProfilCords().subscribe((profilCords:any)=>{
  console.log(profilCords)
  this.profilCords = profilCords
})
//!on récupére le token via un subject
this._userService.getMyToken().subscribe((data:any)=>{
  console.log(data);
  this.tkn = data
});
}



onDisonnect(){
localStorage.clear()
this._route.navigate(['login'])
}
}
