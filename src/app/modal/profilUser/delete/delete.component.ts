import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {

constructor(@Inject (MAT_DIALOG_DATA) public userId:any, private _dialogRef:MatDialogRef<any>, private _userService:UserService,private _route:Router){}

ngOnInit():void{
  console.log(this.userId);
}

onValidate(){
this._userService.deleteUser(this.userId).subscribe((response:any)=>{
  console.log(response);
})
localStorage.clear()
this._dialogRef.close()
this._route.navigate(['/']);


}
onCancel(){
  this._dialogRef.close()
}

};
