import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  constructor(private dataService: DataService) {}


  changeTab(mode: string) {
    this.dataService.changeMode(mode);
  }

  async ngOnInit() {
    console.log('NavComponent initialized');
    await this.dataService.readTSV();
  }

}
