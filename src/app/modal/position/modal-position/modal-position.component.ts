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

  positionUser!:any
  private isRequestSent = false;
  constructor(@Inject (MAT_DIALOG_DATA) public dataPos:any, private _dialogRef:MatDialogRef<any>,private _entrepriseService:EntrepriseService,private _userService:UserService){}

ngOnInit():void{
  console.log(this.dataPos);
  this.positionUser = this.dataPos.position
  console.log('eeeee',this.positionUser);
   //!on ajoute un client + 2 min de temps d'attente
   const userMail = { user_mail: this.dataPos.user_mail };
   if (!this.isRequestSent) {
     this.isRequestSent = true;

     this._entrepriseService.addClient(userMail).subscribe((response: any) => {
       console.log(response);
     });
     //!on ajoute une position au client
     this._userService.addPos(userMail).subscribe((response: any) => {
       console.log(response);

     });
    }
};

onExitModal(){
  this._dialogRef.close(this.dataPos)
};

};
