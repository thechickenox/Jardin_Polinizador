import { AfterViewInit, Component, 
  ElementRef,OnInit, ViewChild } from '@angular/core';
//npm i chart.js --save
import { Chart } from 'chart.js/auto';
import { RealtimeDatabaseService } from '../services/realtime-database.service';
import { User } from '../shared/user.class';
import { AngularFireDatabase, snapshotChanges } from '@angular/fire/compat/database';
import 'firebase/database'
import { Router } from '@angular/router';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.page.html',
  styleUrls: ['./graficas.page.scss'],
})
export class GraficasPage implements OnInit {

  
  data: any;
  riego:any;



  constructor( private dataService: RealtimeDatabaseService, private router: Router) {

  }
    

  ngOnInit() {
    this.dataService.getData().subscribe(data => {
      this.data = data;
      console.log(this.data)
    });
    this.dataService.leerDatos('/Jardin/activar_riego').subscribe((data) => {
      if (data == false) {
        this.riego=false;

      } else if (data == true) {
        this.riego= true;
      }
    });
   
  }
  enviarDatos() {
    if (this.riego == false) {
      const ruta = '/Jardin/activar_riego';
      const datos = true;
      this.dataService.activar_riego(ruta, datos);
    } else if (this.riego == true) {
      const ruta = '/Jardin/activar_riego';
      const datos = false; 
      this.dataService.activar_riego(ruta, datos);
    }
  }
}