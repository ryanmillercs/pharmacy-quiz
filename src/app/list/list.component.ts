import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { Drug } from '../data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  constructor(private dataService: DataService) {}

  dataSource: MatTableDataSource<Drug> = new MatTableDataSource<Drug>();
  drugs: any;
  displayedColumns = [
    'Generic_name',
    'Brand_name',
    'Drug_class',
    'Indication',
    'Pharmacologic_activity',
    'Drug_Target',
    'Target_class_and_location',
    'Target_normal_role_Physiology',
    'MOA',
  ];
  selectedCategories: string[] = [];
  stages = this.dataService.getStages();
  currentDrugs: any = {};

  ngOnInit() {
    console.log('ListComponent initialized');
    this.drugs = this.dataService.getDrugs();
    console.log(this.drugs);
    this.selectedCategories = this.dataService.getSelectedCategories();
    if(this.selectedCategories.length == 0){
      this.dataSource = new MatTableDataSource(this.drugs);
    }else{
      this.currentDrugs = this.drugs.filter((drug: any) => {
        return this.selectedCategories.includes(drug.stage);
      });
      this.dataSource = new MatTableDataSource(this.currentDrugs);
      this.dataService.setCurrentDrugs(this.currentDrugs);
    }
    // TODO Display drugs in a table
    // Add filtering of drugs by stage
  }

  selectedChip() {
    console.log('Selected categories:', this.selectedCategories);
    this.currentDrugs = this.drugs.filter((drug: any) => {
      return this.selectedCategories.includes(drug.stage);
    });
    this.dataSource = new MatTableDataSource(this.currentDrugs);
    this.dataService.setCurrentDrugs(this.drugs);
    if(this.selectedCategories.length == 0){
      this.dataSource = new MatTableDataSource(this.drugs);
    }
    this.dataService.setSelectedCategories(this.selectedCategories);
  }
}
