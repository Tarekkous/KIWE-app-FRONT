import { Component , Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EntrepriseService } from 'src/app/services/entreprise.service';
import { UserService } from 'src/app/services/user.service';
import * as html2pdf from 'html2pdf.js'
@Component({
  selector: 'app-modal-position',
  templateUrl: './modal-position.component.html',
  styleUrls: ['./modal-position.component.scss']
})
export class ModalPositionComponent implements OnInit {
  societyData!:any
  positionUser!:any
  private isRequestSent = false;
  constructor(@Inject (MAT_DIALOG_DATA) public dataPos:any, private _dialogRef:MatDialogRef<any>,private _entrepriseService:EntrepriseService,private _userService:UserService){}

ngOnInit():void{
  this.positionUser = this.dataPos.position
  if (!this.isRequestSent) {
    this.isRequestSent = true;

   const userMail = { user_mail: this.dataPos.user_mail };
     this._entrepriseService.getOneEntreprise(2).subscribe((data: any) => {
      this.societyData = data[0];

      if (this.societyData.id_entreprise === 0 || null) {
        this._userService.associateUser(
          this.societyData.nom_entreprise,
          this.dataPos.user_mail
        ).subscribe((data: any) => {
          console.log(data);
        });
      }
     })
     this._entrepriseService.addClient(userMail).subscribe((response: any) => {
       console.log(response);
     });
     this._userService.addPos(userMail).subscribe((response: any) => {
       console.log(response);
     });
  }
  else {
    console.log(this.isRequestSent);
  }
};


// Pour imprimer la position du client
onPrint(){
  window.print()
}

onExitModal(){
  this._dialogRef.close(this.dataPos)
  }

};
