import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { EntrepriseService } from 'src/app/services/entreprise.service';

@Component({
  selector: 'app-entreprise-admin',
  templateUrl: './entreprise-admin.component.html',
  styleUrls: ['./entreprise-admin.component.scss']
})
export class EntrepriseAdminComponent  {

  clients :any[] = []
  societyData!:any;
  constructor(private _adminService:AdminService, private _entrepriseService:EntrepriseService){}

  ngOnInit(){
    //!récupérer les données de l'entreprise
    this._entrepriseService.getOneEntreprise(2).subscribe((data: any) => {
      this.societyData = data[0];
      console.log('company data : ' ,this.societyData);

      //!récupérer tout les utilisateurs qui appartiennent à cette entreprise
      if (this.societyData && this.societyData.id_entreprise) {
        const id = this.societyData.id_entreprise;
        this._adminService.getAllClients(id).subscribe((data: any) => {
          console.log('clients getted successfully !',data);
          // on pousse les utilisateurs dans le TABLEAU
          const firstName = data.user_firstname
          const lastName = data.user_lastname
          const position = data.position
          this.clients.push(data)
          console.log('all clients:' , this.clients);
        });
      }
    });
  };







};
