import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  user = new User
  token!:string;
  loginFormUser!: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _router: Router,
    private _snackBar: MatSnackBar

  ) {}

  ngOnInit(): void {
    this.loginFormUser = this._fb.group({
      email: [this.user.user_mail, Validators.required],
      password: [this.user.user_lastname, Validators.required],
    });
    // this._userService.getAllUsers().subscribe((data: any) => {
    //   console.log(data);
    // });

  }
  onSubmit(): void {
    try {
      const email = this.loginFormUser.value.email;
      const password = this.loginFormUser.value.password;
      console.log(email , password);
      var dataLogin = { user_mail: email, user_mdp: password };
      this._userService.postLogin(dataLogin).subscribe((response: any) => {
        console.log(response.loginUser);
        this.token = response.accessToken
        localStorage.setItem('Token',this.token)
        localStorage.setItem('profilCords',JSON.stringify(response.loginUser))
      });
      this._router.navigate(['overview/home']);
    } catch (err) {
      this._snackBar.open('wrong mail adress!','Retry',{verticalPosition:'top'});
    }

  }
  onRegister() {
    this._router.navigate(['register']);

  }
}
