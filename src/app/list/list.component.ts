import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  constructor(private dataService: DataService) { }

  drugs: any = {};

  ngOnInit() {
    console.log('ListComponent initialized');
    this.dataService.getDrugs();
    // TODO Display drugs in a table
    // Add filtering of drugs by stage
  }
}
