import { Component, OnInit} from '@angular/core';
import { RealtimeDatabaseService } from '../services/realtime-database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.page.html',
  styleUrls: ['./informacion.page.scss'],
})
export class InformacionPage implements OnInit {
  data: any;


  constructor(private dataService: RealtimeDatabaseService, private router: Router) { }

    ngOnInit() {
      this.dataService.getData().subscribe(data => {
        this.data = data;
        console.log(this.data)
      });
    }

    das(){
      this.router.navigateByUrl('/dashboard');

    }

}
