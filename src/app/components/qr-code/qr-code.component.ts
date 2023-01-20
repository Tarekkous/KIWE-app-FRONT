import { Component } from '@angular/core';
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
  title = 'test-QR';
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value: any;
  margin = 10;
  scale = 5;

  constructor(private _entrepriseService: EntrepriseService) {}

  ngOnInit(): void {
  this.getEntreprise()
  }

  //!get entreprise
  getEntreprise() {
    this._entrepriseService.getEntreprise(1).subscribe((data: any) => {
      this.nbClientsEnAttente = data[0].nombre_clients_en_attente;
      this.tempsAttente = data[0].temps_attente
      //valeur QR :
      this.value = `Nombre de clients en attente : ${this.nbClientsEnAttente}, temps d'attente estimé : ${this.tempsAttente}`;
      console.log(this.nbClientsEnAttente);
    });
  }

}
