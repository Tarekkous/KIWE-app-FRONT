import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { EntrepriseService } from 'src/app/services/entreprise.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-entreprise-admin',
  templateUrl: './entreprise-admin.component.html',
  styleUrls: ['./entreprise-admin.component.scss']
})
export class EntrepriseAdminComponent  {

  clients :any[] = []
  societyData!:any;
  constructor(private _adminService:AdminService, private _entrepriseService:EntrepriseService, private _userService: UserService){}

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
            data.forEach((client: any) => {
              const firstName = client.user_firstname;
              const lastName = client.user_lastname;
              const position = client.position;
              this.clients.push(client);
            });

          console.log('all clients:' , this.clients);
        });
      }
    });
    setTimeout(() => {
      window.location.reload();
    }, 30000);
  };

  //!on dissocie le client de l'entreprise(dissocier de l'entreprise)
  onRemove(mail: string) {
    const userMail = {user_mail : mail}
    this._userService.dissociateUser(userMail).subscribe((user: any) => {
      console.log(user);
        // on enleve -2min du temps d'attente
        const id = {id:this.societyData.id_entreprise}
        this._adminService.reduceTimeCompany(id).subscribe((data:any)=>{
          console.log(data);
        });
        this._adminService.removePosition(userMail).subscribe((removePos:any)=>{
          console.log(removePos);
        })

      // Mettre à jour la liste des clients ici, en supprimant le client avec le mail donné
      this.clients = this.clients.filter((client) => client.user_mail !== mail);

    });
  };






};
