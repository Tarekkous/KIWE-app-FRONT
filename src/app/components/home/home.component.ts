import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { GeolocationComponent } from '../geolocation/geolocation.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
tkn!:any
  constructor(private _userService:UserService){}

  ngOnInit():void{
//!on récupére le profilCords via un subject
this._userService.getProfilCords().subscribe((profilCords:any)=>{
  console.log(profilCords);
})
this._userService.getMyToken().subscribe((data:any)=>{
  console.log(data);
  this.tkn = data
});
  }


}
