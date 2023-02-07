import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EntrepriseService } from 'src/app/services/entreprise.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-historique-commandes',
  templateUrl: './historique-commandes.component.html',
  styleUrls: ['./historique-commandes.component.scss'],
})
export class HistoriqueCommandesComponent {
cords!:any
  userCords!: any;
  societyData!: any;
  private isRequestSent = false;

  constructor(
    private _entrepriseService: EntrepriseService,
    private _userService: UserService,
    private _route:Router
  ) {}

  ngOnInit(): void {
    //!récupérer les données de l'entreprise
    this._entrepriseService.getOneEntreprise(3).subscribe((data: any) => {
      this.societyData = data[0];
      console.log(this.societyData.nom_entreprise);
      //! on associe l'utilisateur connecté à l'entreprise visité
      this._userService.associateUser(this.societyData.nom_entreprise, this.userCords.user_mail).subscribe((data: any) => {
          console.log(data);
        });
    });

    this.userCords = JSON.parse(localStorage.getItem('profilCords') as any);
    const userFirstName = this.userCords.user_firstname;
    const userLastName = this.userCords.user_lastname;
    console.log('coordonnées utilisateur :' , this.userCords);
    console.log(this.isRequestSent);


    //get one user
    this._userService.getOneUser(this.userCords.id_user).subscribe((user:any)=>{
      console.log('ici user',user);
      this.cords = user[0]
    })
  };

  //Methode on WAIT  :
  onValidate(): void {
    //!on ajoute un client + 2 min de temps d'attente
    const userMail = {"user_mail" : this.cords.user_mail}
    if (!this.isRequestSent) {
    this.isRequestSent = true

      this._entrepriseService.addClient(userMail).subscribe((response: any) => {
        console.log(response);
      });
        //!on ajoute une position au client
    this._userService.addPos(userMail).subscribe((response:any)=>{
      console.log(response);
    });

    //rafraichir la page afin de visualiser les nouvelles données*****
    window.location.href = "/overview/historique"

    };
    console.log(this.isRequestSent);
  };

  //Methode on EXIT  :

onExit(){
  const userMail = {"user_mail" : this.cords.user_mail}

  this._userService.dissociateUser(userMail).subscribe((response:any)=>{
    console.log(response);
  });
this._route.navigate(['overview/home'])


}






}

