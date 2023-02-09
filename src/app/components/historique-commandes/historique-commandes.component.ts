import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalPositionComponent } from 'src/app/modal/position/modal-position/modal-position.component';
import { EntrepriseService } from 'src/app/services/entreprise.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-historique-commandes',
  templateUrl: './historique-commandes.component.html',
  styleUrls: ['./historique-commandes.component.scss'],
})
export class HistoriqueCommandesComponent implements OnInit {

 constructor(){}

 ngOnInit():void{

 }

};
