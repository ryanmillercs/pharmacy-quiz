import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  constructor(private dataService: DataService) {}

  changeTab($event: any) {
    switch ($event) {
      case 0:
        this.dataService.changeMode('FlashCards');
        break;
      case 1:
        this.dataService.changeMode('Questions');
        break;
      case 2:
        this.dataService.changeMode('List');
        break;
      default:
        break;
    }
    // this.dataService.changeMode(mode);
  }

  async ngOnInit() {
    console.log('NavComponent initialized');
    await this.dataService.readTSV();
  }
}
