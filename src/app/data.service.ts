import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  drugs: any = {};

  showQuestionsComponent = false;

  toggleQuestions() {
    this.showQuestionsComponent = !this.showQuestionsComponent;
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
        Target: drug[6],
        Target_class_location: drug[7],
        Target_normal_role: drug[8],
        Mechanism_of_action: drug[9],
      };
    });
    // console.log(this.drugs);
  }

}
