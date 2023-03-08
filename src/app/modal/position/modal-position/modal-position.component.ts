import { Component , Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EntrepriseService } from 'src/app/services/entreprise.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-modal-position',
  templateUrl: './modal-position.component.html',
  styleUrls: ['./modal-position.component.scss']
})
export class ModalPositionComponent implements OnInit {
  societyData!:any
  positionUser!:any
  isRequestSent = false;
  constructor(@Inject (MAT_DIALOG_DATA) public dataPos:any, private _dialogRef:MatDialogRef<any>,private _entrepriseService:EntrepriseService,private _userService:UserService){}

ngOnInit():void{
  console.log(this.dataPos);
  this.positionUser = this.dataPos.position
  console.log('voici la position de user',this.positionUser);
  console.log('isRequestSent =',this.isRequestSent);



};


//! pour imprimer la position
onPrint(){
  window.print()
}

//! pour ajouter 1 client en attente + 2 min d'attente + associer l'utilisateur
onExitModal(){
  if (!this.isRequestSent) {

   //on ajoute un client + 2 min de temps d'attente et on associe l'utilisateur à l'entreprise
   const userMail = { user_mail: this.dataPos.user_mail };
     this._entrepriseService.getOneEntreprise(2).subscribe((data: any) => {
      this.societyData = data[0];

      //si le user n'est plus associé à l'entreprise au moment ou il décide d'attendre , on l'associe de nouveau à l'entreprise
      if (this.societyData.id_entreprise === 0 || null) {
        this._userService.associateUser(
          this.societyData.nom_entreprise,
          this.dataPos.user_mail
        ).subscribe((data: any) => {
          console.log(data);
        });
      }
     })
     // on ajoute un client à la file d'attente
     this._entrepriseService.addClient(userMail).subscribe((response: any) => {
       console.log(response);
     });
     //on ajoute une position au client
     this._userService.addPos(userMail).subscribe((response: any) => {
       console.log(response);

     });
    this.isRequestSent = true;

     console.log('new isRequestSent = ',this.isRequestSent);
  }
  this._dialogRef.close(this.dataPos)
  }

};
