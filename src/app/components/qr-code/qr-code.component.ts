import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { EntrepriseService } from 'src/app/services/entreprise.service';
import { ParametresComponent } from '../parametres/parametres.component';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})
export class QrCodeComponent {
  nbClientsEnAttente!: any;
  tempsAttente!:any



  //! CODE QR ATTRIBUTS
  title = 'test-QR';
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value: any;
  margin = 10;
  scale = 5;

  constructor(private _entrepriseService: EntrepriseService, private _route:Router) {
    // this.value = this._route.navigate(['overview']);
  }

  ngOnInit(): void {
  this.getEntreprise()

// this.updateEntreprise()

  }

  //!get entreprise
  getEntreprise() {
    this._entrepriseService.getEntreprise(3).subscribe((data: any) => {
      console.log(data);
      this.nbClientsEnAttente = data[0].nombre_clients_en_attente;
      console.log('Nombre client en attente',this.nbClientsEnAttente);
      this.tempsAttente = Math.round((this.nbClientsEnAttente * 5)/60)
      console.log('temps dattente en heures',this.tempsAttente);
      //valeur QR :
      this.value = `${this.tempsAttente}H`
      // this.value = `Nombre de clients en attente : ${this.nbClientsEnAttente}, temps d'attente estimé : ${this.tempsAttente}`;
    });

  }
  updateEntreprise(){
        // récupérer le mail au moment du login
        const email = JSON.parse(localStorage.getItem('profilCords') as any);
        console.log(email.user_mail);
    // modifier le nombre du client en attente de l'entreprise où le user_mail = email
      this._entrepriseService.updateEntreprise(2,email).subscribe((data:any)=>{
        console.log(data);
      })
  }
}
