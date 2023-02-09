import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { OverviewComponent } from './components/overview/overview.component';
import { QrCodeComponent } from './components/qr-code/qr-code.component';
import { RegisterComponent } from './components/register/register.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { CommonModule } from '@angular/common';
import { GeolocationComponent } from './components/geolocation/geolocation.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { SideBarRightComponent } from './components/side-bar-right/side-bar-right.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HistoriqueCommandesComponent } from './components/historique-commandes/historique-commandes.component';
import { ParametresComponent } from './components/parametres/parametres.component';
import { ModalPositionComponent } from './modal/position/modal-position/modal-position.component';
import { EntrepriseComponent } from './components/entreprise/entreprise.component'
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    OverviewComponent,
    QrCodeComponent,
    RegisterComponent,
    TopBarComponent,
    GeolocationComponent,
    SideBarRightComponent,
    HistoriqueCommandesComponent,
    ParametresComponent,
    ModalPositionComponent,
    EntrepriseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    HttpClientModule,
    FormsModule,
    NgxQRCodeModule,
    CommonModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass : AuthInterceptor,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
