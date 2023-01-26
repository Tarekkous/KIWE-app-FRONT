import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeolocationComponent } from './components/geolocation/geolocation.component';
import { HistoriqueCommandesComponent } from './components/historique-commandes/historique-commandes.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { OverviewComponent } from './components/overview/overview.component';
import { ParametresComponent } from './components/parametres/parametres.component';
import { QrCodeComponent } from './components/qr-code/qr-code.component';
import { RegisterComponent } from './components/register/register.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  {path: 'overview',component: OverviewComponent, canActivate: [AuthGuard],
    children: [
      { path: 'topbar', component: TopBarComponent },
      { path: 'home', component: HomeComponent ,canActivate: [AuthGuard],
         children : [
           { path: 'geolocation', component: GeolocationComponent}

                      ]},
      { path: 'qrcode', component: QrCodeComponent,canActivate: [AuthGuard]},
      { path: 'historique', component: HistoriqueCommandesComponent,canActivate: [AuthGuard]},
      { path: 'parametres', component: ParametresComponent,canActivate: [AuthGuard]},

    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
