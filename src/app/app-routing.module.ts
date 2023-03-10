import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { EntrepriseAdminComponent } from './components/entreprise-admin/entreprise-admin.component';
import { EntrepriseComponent } from './components/entreprise/entreprise.component';
import { GeolocationComponent } from './components/geolocation/geolocation.component';
import { HistoriqueCommandesComponent } from './components/historique-commandes/historique-commandes.component';
import { HomeComponent } from './components/home/home.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { LoginComponent } from './components/login/login.component';
import { OverviewComponent } from './components/overview/overview.component';
import { ParametresAdminComponent } from './components/parametres-admin/parametres-admin.component';
import { ParametresComponent } from './components/parametres/parametres.component';
import { QrCodeComponent } from './components/qr-code/qr-code.component';
import { RegisterComponent } from './components/register/register.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent},
  { path: 'logAdmin', component: LoginAdminComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminComponent,canActivate:[AdminGuard],
      children: [
        {path:'entrepriseAdmin', component:EntrepriseAdminComponent, canActivate:[AdminGuard]},
        {path:'parametresAdmin', component:ParametresAdminComponent, canActivate:[AdminGuard]}

      ] },

  {path: 'overview',component: OverviewComponent, canActivate: [AuthGuard],
    children: [
      { path: 'topbar', component: TopBarComponent },
      { path: 'home', component: HomeComponent ,canActivate:[AuthGuard],
         children : [
           { path: 'geolocation', component: GeolocationComponent},
           { path: 'qrcode', component: QrCodeComponent,canActivate: [AuthGuard]},
                      ]},
      { path: 'historique', component: HistoriqueCommandesComponent,canActivate: [AuthGuard]},
      { path: 'parametres', component: ParametresComponent,canActivate: [AuthGuard]},
      { path: 'entreprise', component: EntrepriseComponent,canActivate: [AuthGuard]},

    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
