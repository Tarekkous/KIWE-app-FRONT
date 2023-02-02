import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { EntrepriseService } from 'src/app/services/entreprise.service';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})
export class QrCodeComponent {
  nbClientsEnAttente!: any;
  tempsAttente!:any


  //! CODE QR ATTRIBUTS
  title = 'QR-CODE';
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value: any;
  margin = 10;
  scale = 5;

  constructor(private _entrepriseService: EntrepriseService, private _route:Router, private route:ActivatedRoute) {
    // console.log(this.route.snapshot.url);
    // console.log(this.route.snapshot.paramMap.get('id'));
    // this.value = this.route.snapshot.url.join('/');
  }

  ngOnInit(): void {
  this.getEntreprise()

// this.updateEntreprise()

  }

  //!get entreprise
  getEntreprise() {
    this._entrepriseService.getEntreprise(4).subscribe((data: any) => {
      console.log(data);
      this.nbClientsEnAttente = data[0].nombre_clients_en_attente;
      console.log('Nombre client en attente',this.nbClientsEnAttente);
      this.tempsAttente = Math.round((this.nbClientsEnAttente * 5)/60)
      console.log('temps dattente en heures',this.tempsAttente);
      //valeur QR :
      this.value = `http://192.168.1.128:4200/overview/qrcode`
      // this.value = `Nombre de clients en attente : ${this.nbClientsEnAttente}, temps d'attente estimé : ${this.tempsAttente}`;
    });

  }
  updateEntreprise(){
        // récupérer le mail au moment du login
        const email = JSON.parse(localStorage.getItem('profilCords') as any);
        console.log(email.user_mail);
    // modifier le nombre du client en attente de l'entreprise où le user_mail = email
      this._entrepriseService.updateEntreprise(3,email).subscribe((data:any)=>{
        console.log(data);
      })
  }
}
