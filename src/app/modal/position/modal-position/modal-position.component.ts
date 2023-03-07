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
  console.log(this.dataPos);
  this.positionUser = this.dataPos.position
  console.log('voici la position de user',this.positionUser);
  console.log('ooooo',this.isRequestSent);
  if (!this.isRequestSent) {
    this.isRequestSent = true;

   //!on ajoute un client + 2 min de temps d'attente et on associe l'utilisateur à l'entreprise
   const userMail = { user_mail: this.dataPos.user_mail };
     this._entrepriseService.getOneEntreprise(2).subscribe((data: any) => {
      this.societyData = data[0];

      //!si le user n'est plus associé à l'entreprise au moment ou il décide d'attendre , on l'associe de nouveau à l'entreprise
      if (this.societyData.id_entreprise === 0 || null) {
        this._userService.associateUser(
          this.societyData.nom_entreprise,
          this.dataPos.user_mail
        ).subscribe((data: any) => {
          console.log(data);
        });
      }
     })
     //! on ajoute un client à la file d'attente
     this._entrepriseService.addClient(userMail).subscribe((response: any) => {
       console.log(response);
     });
     //!on ajoute une position au client
     this._userService.addPos(userMail).subscribe((response: any) => {
       console.log(response);

     });
  }

};


//! télécharger le fichier en pdf ( HTML 2 PDF)
download(){
  var element = document.getElementById('position');
var opt = {
margin:       1,
filename:     'position.pdf',
image:        { type: 'jpeg', quality: 0.98 },
html2canvas:  { scale: 2 },
jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
};

// New Promise-based usage:
html2pdf().from(element).set(opt).save();
}

onExitModal(){
  this._dialogRef.close(this.dataPos)
  }

};
