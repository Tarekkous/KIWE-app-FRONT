import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalPositionComponent } from 'src/app/modal/position/modal-position/modal-position.component';
import { EntrepriseService } from 'src/app/services/entreprise.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-entreprise',
  templateUrl: './entreprise.component.html',
  styleUrls: ['./entreprise.component.scss']
})
export class EntrepriseComponent implements OnInit {
  cords!: any;
  userCords!: any;
  societyData!: any;
  positionUser!:any
  constructor(
    private _entrepriseService: EntrepriseService,
    private _userService: UserService,
    private _route: Router,
    public _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // window.location.href= '/overview/entreprise'
    //!récupérer les données de l'entreprise
    this._entrepriseService.getOneEntreprise(2).subscribe((data: any) => {
      this.societyData = data[0];
      //! on associe l'utilisateur connecté à l'entreprise visité
    this.userCords = JSON.parse(localStorage.getItem('profilCords') as any);

      this._userService.associateUser(
          this.societyData.nom_entreprise,
          this.userCords.user_mail
        ).subscribe()
    });

    this.userCords = JSON.parse(localStorage.getItem('profilCords') as any);
    const userFirstName = this.userCords.user_firstname;
    const userLastName = this.userCords.user_lastname;

    //get one user
    this._userService.getOneUser(this.userCords.id_user)
      .subscribe((user: any) => {
        this.cords = user[0];

      });


  };

  //Methode on WAIT  :
  onValidate(cords:any):void {

      let modal = this._dialog.open(ModalPositionComponent, {
        width: '300px',
        height: '300px',
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '500ms',
        data: cords
      });
      modal.afterClosed().subscribe((data:any)=>{
        this.positionUser = data
      });
    };


  //Methode on EXIT  :

  onExit() {
    const userMail = { user_mail: this.cords.user_mail };
 //on enleve un client et 2 min d'attente
  this._entrepriseService.removeClient(userMail).subscribe((response:any)=>{
    console.log(response);
    console.log(this.cords.position);
  });

// on dissocie l'utilisateur de l'entreprise
    this._userService.dissociateUser(userMail).subscribe((response: any) => {
      console.log(response);
    });

    this._route.navigate(['overview/home']);
  }

};
