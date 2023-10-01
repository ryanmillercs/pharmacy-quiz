import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  drugs: any = {};
  currentDrugs:any = {};

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

  async readTSV() {
    let tsv = await (await fetch('assets/drugs.tsv')).text();
    // console.log(tsv);
    let tsv_rows = tsv.split("\n").slice(2);
    tsv_rows.forEach((row) => {
      let drug = row.split("\t");
      this.drugs[drug[1]] = {
        Brand_name: drug[2],
        Drug_class: drug[3],
        Indication: drug[4],
        Pharmacologic_activity: drug[5],
        Drug_Target: drug[6],
        Target_class_and_location: drug[7],
        Target_normal_role_Physiology: drug[8],
        MOA: drug[9],
        stage: drug[0],
      };
    });
    console.log(this.drugs);
  }

}
