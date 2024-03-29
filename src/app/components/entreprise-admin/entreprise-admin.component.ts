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

      //!récupérer tout les utilisateurs qui appartiennent à cette entreprise
      if (this.societyData && this.societyData.id_entreprise) {
        const id = this.societyData.id_entreprise;

        this._adminService.getAllClients(id).subscribe((data: any) => {
           function compareClientIds(clientA: any, clientB: any) {
         return clientA.position - clientB.position;
        }
            data.forEach((client: any) => {
              this.clients.push(client);
            });
          this.clients.sort(compareClientIds);
        });
      }
    });
    setTimeout(() => {
      window.location.reload();
    }, 50000);
  };

  //!on dissocie le client de l'entreprise(dissocier de l'entreprise)
  onRemove(mail: string) {
    const userMail = {user_mail : mail}
    this._userService.dissociateUser(userMail).subscribe((user: any) => {
      console.log(user);
        const id = {id:this.societyData.id_entreprise}
        this._adminService.reduceTimeCompany(id).subscribe((data:any)=>{
          console.log(data);
        });
        this._adminService.removePosition(userMail).subscribe((removePos:any)=>{
          console.log(removePos);
        })

      this.clients = this.clients.filter((client) => client.user_mail !== mail);

    });
  };






};
