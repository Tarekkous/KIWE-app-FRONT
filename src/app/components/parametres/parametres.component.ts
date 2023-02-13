import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DeleteComponent } from 'src/app/modal/profilUser/delete/delete.component';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-parametres',
  templateUrl: './parametres.component.html',
  styleUrls: ['./parametres.component.scss'],
})
export class ParametresComponent implements OnInit {
  user = new User();
  idUser!:number;
  userCords!:any;
  userGetted:any
  userProfil!: FormGroup;

  constructor(private _fb: FormBuilder, private _userService:UserService, private _snackBar:MatSnackBar,private _route:Router,private _dialog:MatDialog) {}

  ngOnInit(): void {
    this.userProfil = this._fb.group({
      firstName: this.user.user_firstname,
      lastName: this.user.user_lastname,
      email: [this.user.user_mail, Validators.required],
      password: [this.user.user_mdp, Validators.required],
    });
    //récupérer l'ID de l'utilisateur connecté
    this.userCords = JSON.parse(localStorage.getItem('profilCords') as any);

       //get one user
       this._userService
       .getOneUser(this.userCords.id_user)
       .subscribe((user: any) => {
         console.log('ici user', user[0]);
         this.idUser = this.userCords.id_user
         this.userGetted = user[0]

       });
  };

  onUpdate() {
    const userCordsProfil = {
      user_firstname: this.userProfil.value.firstName,
      user_lastname: this.userProfil.value.lastName,
      user_mail: this.userProfil.value.email,
      user_mdp: this.userProfil.value.password,
    };
    this._userService.updateUser(this.userCords.id_user,userCordsProfil).subscribe((response:any)=>{
      console.log(response);
    });
    this._snackBar.open('Profil updated','ok', {verticalPosition:'top'})

  }
  onDeleteProfil() {
  let modal = this._dialog.open(DeleteComponent,{
    width: '300px',
    height: '220px',
    enterAnimationDuration: '500ms',
    exitAnimationDuration: '500ms',
    data: this.idUser
  });
  }
  onCancel() {
    this._route.navigate(['overview/home']);

  }
};
