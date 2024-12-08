import { Component, OnInit } from '@angular/core';
import { RealtimeDatabaseService } from '../services/realtime-database.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/user.class';
import { AngularFireDatabase, snapshotChanges } from '@angular/fire/compat/database';
import 'firebase/database'




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  
})


export class DashboardPage implements OnInit {


  data: any;

  riego:any;




  constructor(private dataService: RealtimeDatabaseService, private authSvc: AuthService, private router: Router) { 
  }
  
    public datosi: Number = 0;
    public dato2: Number = 0;
    public dato3: Number = 0;
    public dato4: Number = 0;
    public dato5: Number = 0;




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



  OnLogouts() {
    this.authSvc.OnLogout();
    this.router.navigateByUrl('/login');
  }

  info(){
    this.router.navigateByUrl('/info');
  }
  informacion(){
    this.router.navigateByUrl('/informacion');
  }
  
  Activar(){
    this.router.navigateByUrl('/graficas');

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