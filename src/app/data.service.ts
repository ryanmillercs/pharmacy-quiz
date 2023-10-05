import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() {
    this.drugs = [];
  }

  drugs: Drug[];
  currentDrugs:any = {};
  stages = new Set();
  selectedCategories: string[] = [];

  showQuestionsComponent = false;
  showListComponent = false;
  showFlashCardsComponent = false;

  changeMode(mode:string){
    if(mode === 'List'){
      this.showQuestionsComponent = false;
      this.showListComponent = !this.showListComponent;
      this.showFlashCardsComponent = false;
    }else if(mode === 'Questions'){
      this.showQuestionsComponent = !this.showQuestionsComponent;
      this.showListComponent = false;
      this.showFlashCardsComponent = false;
    }else if(mode === 'FlashCards'){
      this.showQuestionsComponent = false;
      this.showListComponent = false;
      this.showFlashCardsComponent = !this.showFlashCardsComponent;
    }
  }

  setCurrentDrugs(drugs:any){
    this.currentDrugs = drugs;
  }

  getCurrentDrugs(){
    return this.currentDrugs;
  }

  getDrugs() {
    return this.drugs;
  }
  getStages() {
    return this.stages;
  }

  getSelectedCategories() {
    return this.selectedCategories;
  }
  setSelectedCategories(selectedCategories: string[]) {
    this.selectedCategories = selectedCategories;
  }


  async readTSV() {
    let tsv = await (await fetch('assets/drugs.tsv')).text();
    // console.log(tsv);
    let tsv_rows = tsv.split("\n").slice(2);
    tsv_rows.forEach((row) => {
      let drug = row.split("\t");
      this.drugs.push( {
        Generic_name: drug[1],
        Brand_name: drug[2],
        Drug_class: drug[3],
        Indication: drug[4],
        Pharmacologic_activity: drug[5],
        Drug_Target: drug[6],
        Target_class_and_location: drug[7],
        Target_normal_role_Physiology: drug[8],
        MOA: drug[9],
        stage: drug[0],
    }as Drug);
      this.stages.add(drug[0]);
    });
    console.log(this.drugs);
    this.currentDrugs = this.drugs;
    // console.log(this.stages)
  }

}

export interface Drug {
  Generic_name: string;
  Brand_name: string;
  Drug_class: string;
  Indication: string;
  Pharmacologic_activity: string;
  Drug_Target: string;
  Target_class_and_location: string;
  Target_normal_role_Physiology: string;
  MOA: string;
  stage: string;
}
