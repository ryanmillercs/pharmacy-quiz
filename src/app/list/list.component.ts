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
  selectedRow: any;
  selectedRows: { [key: string]: Drug } = {};
  searchBox: string = '';

  ngOnInit() {
    this.drugs = this.dataService.getDrugs();
    this.selectedCategories = this.dataService.getSelectedCategories();
    this.selectedRows = this.dataService.getSelectedDrugs();
    console.log(this.selectedRows);
    if (this.selectedCategories.length == 0) {
      this.dataSource = new MatTableDataSource(this.drugs);
    } else {
      this.currentDrugs = this.drugs.filter((drug: any) => {
        return this.selectedCategories.includes(drug.stage);
      });
      this.dataSource = new MatTableDataSource(this.currentDrugs);
      this.dataService.setCurrentDrugs(this.currentDrugs);
      this.selectedChip();
    }
    // TODO Display drugs in a table
    // Add filtering of drugs by stage
  }

  selectedChip() {
    this.currentDrugs = this.drugs.filter((drug: any) => {
      return (
        this.selectedCategories.includes(drug.stage) ||
        this.selectedRows[drug.Generic_name]
      );
    });
    this.dataSource = new MatTableDataSource(this.currentDrugs);
    this.dataService.setCurrentDrugs(this.currentDrugs);
    // If no categories are selected, display all drugs
    if (this.selectedCategories.length == 0) {
      this.dataSource = new MatTableDataSource(this.drugs);
    }
    // Set so that the question component can access the current selected drugs
    this.dataService.setSelectedCategories(this.selectedCategories);
  }

  selectRow(row: Drug) {
    console.log(this.selectedRows);
    if (row.Generic_name in this.selectedRows) {
      delete this.selectedRows[row.Generic_name];
    } else {
      this.selectedRows[row.Generic_name] = row;
      this.dataService.setSelectedDrugs(this.selectedRows);
    }
  }

  onInputFocusOut($event: any) {
    console.log(this.searchBox);
    let searched = this.drugs.filter((drug: any) => {
      return (
        drug.Generic_name.toLowerCase().includes(
          this.searchBox.toLowerCase()
        ) ||
        drug.Brand_name.toLowerCase().includes(this.searchBox.toLowerCase())
      );
    });
    this.dataSource = new MatTableDataSource(searched);
  }
}
