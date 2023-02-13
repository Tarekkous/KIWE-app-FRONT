import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { EntrepriseService } from 'src/app/services/entreprise.service';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})
export class QrCodeComponent implements OnInit {
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
  };

  ngOnInit(): void {
      //valeur QR :
      this.value = `http://192.168.1.2:4200/overview/entreprise`


  }

  goBack(){
    this._route.navigate(['/overview/home']);
  };
  goSociety():void{
    this._route.navigate(['overview/entreprise'])
  }
}
