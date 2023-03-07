import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AdminService } from 'src/app/services/admin.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss']
})
export class LoginAdminComponent {
  user = new User
  token!:string;
  loginAdmin!: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _adminService: AdminService,
    private _router: Router,
    private _snackBar: MatSnackBar

  ) {}

  ngOnInit(): void {
    this.loginAdmin = this._fb.group({
      email: [this.user.user_mail, Validators.required],
      password: [this.user.user_lastname, Validators.required],
    });
    // this._userService.getAllUsers().subscribe((data: any) => {
    //   console.log(data);
    // });

  }
onSubmit(): void {
  try {
    const email = this.loginAdmin.value.email;
    const password = this.loginAdmin.value.password;
    console.log(email , password);
    var dataLogin = { user_mail: email, user_mdp: password };
    this._adminService.postLoginAdmin(dataLogin).subscribe((response: any) => {
      if (response.loginAdmin === undefined) {
        this._snackBar.open('vous devez être Admin pour accéder à cette page','ok',{verticalPosition:'top'});

      }
      console.log('ici reponse : ',response.loginAdmin);

      this.token = response.accessToken
      localStorage.setItem('Token',this.token)
      console.log(response.loginAdmin.statut);
      localStorage.setItem('adminStatut',JSON.stringify(response.loginAdmin.statut))
      localStorage.setItem('adminCords',JSON.stringify(response.loginAdmin))

      // naviguer vers la page de destination ici
    this._router.navigate(['admin/entrepriseAdmin']);

    }, error => {
      this._snackBar.open('vous devez être Admin pour accéder à cette page','ok',{verticalPosition:'top'});
    });
  } catch (err) {
    console.log(err);
  }

  }
  onRegister() {
    this._router.navigate(['register']);

  }
}
