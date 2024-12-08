import { Component, OnInit } from '@angular/core';
import { RealtimeDatabaseService } from '../services/realtime-database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  data: any;

  constructor(private dataService: RealtimeDatabaseService) { }

  ngOnInit() {
    this.dataService.getData().subscribe(data => {
      this.data = data;
      console.log(this.data)
    });
  }


}