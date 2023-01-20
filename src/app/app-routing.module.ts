import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeolocationComponent } from './components/geolocation/geolocation.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { OverviewComponent } from './components/overview/overview.component';
import { QrCodeComponent } from './components/qr-code/qr-code.component';
import { RegisterComponent } from './components/register/register.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path: 'overview',component: OverviewComponent,
    children: [
      { path: 'topbar', component: TopBarComponent },
      { path: 'home', component: HomeComponent },
      { path: 'qrcode', component: QrCodeComponent},
      { path: 'geolocation', component: GeolocationComponent},

    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
