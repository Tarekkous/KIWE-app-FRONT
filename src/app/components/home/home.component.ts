import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { GeolocationComponent } from '../geolocation/geolocation.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

showQrCode = false;
showGeolocation = false;
tkn!:any

  constructor(private _userService:UserService,private router: Router){}

  ngOnInit():void{

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showGeolocation = event.url.includes('/geolocation');
        this.showQrCode = event.url.includes('/qrcode');
      }
    });





//!on récupére le profilCords via un subject
this._userService.getProfilCords().subscribe((profilCords:any)=>{
  console.log(profilCords);
})
this._userService.getMyToken().subscribe((data:any)=>{
  console.log(data);
  this.tkn = data
});
  };


}
