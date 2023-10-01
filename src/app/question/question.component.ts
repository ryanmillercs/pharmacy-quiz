import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent implements OnInit {
  constructor(private dataService: DataService, public dialog: MatDialog) {}
  drug_columns = [
    'Brand_name',
    'Drug_class',
    'Indication',
    'Pharmacologic_activity',
    'Drug_Target',
    'Target_class_and_location',
    'Target_normal_role_Physiology',
    'MOA',
  ];
  usedQuestions: { [key: string]: string } = {};
  currentQuestion = '';
  targetAnswer = '';
  currentAnswer = '';
  drugs: any;
  selectedCategories: string[] = [];
  isBackgroundRed = false;

  ngOnInit() {
    console.log('QuestionComponent initialized');
    this.drugs = this.dataService.getDrugs();
    console.log(this.drugs);
    let question = this.getRandomQuestion();
    this.usedQuestions[question] = this.targetAnswer;
    this.currentQuestion = question;
  }

  selectedChip() {
    console.log('Selected categories:', this.selectedCategories);
  }

  submitAnswer() {
    console.log(this.currentAnswer);
    const colMatch: RegExp = /(Brand name) | (Generic Name)/g;
    if (
      this.currentQuestion.match(colMatch) &&
      this.currentAnswer.toLowerCase() !== this.targetAnswer.toLowerCase()
    ) {
      console.log('WRONG ANSWER');
      this.isBackgroundRed = true;
    } else {
      this.isBackgroundRed = false;
      const dialogRef = this.dialog.open(DialogComponent, {
        data: {
          answer: this.targetAnswer,
        },
      });
      dialogRef.afterClosed().subscribe(() => {
        let question = this.getRandomQuestion();
        while (this.usedQuestions.hasOwnProperty(question)) {
          question = this.getRandomQuestion();
        }
        this.currentQuestion = question;
        this.usedQuestions[question] = this.targetAnswer;
      });
      console.log(this.usedQuestions);
      this.currentAnswer = '';
    }
  }

  onInputFocusOut(event: any) {
    this.currentAnswer = event.target.value;
    console.log(this.currentAnswer);
  }

  getRandomQuestion() {
    let keys = Object.keys(this.drugs);
    let randomDrug = keys[Math.floor(Math.random() * keys.length)];
    let randomColumn = Math.ceil(Math.random() * 8);

    let colName = this.drug_columns[randomColumn];
    // Keep generating random columns until we get one that is not undefined
    while (colName == undefined) {
      randomColumn = Math.ceil(Math.random() * 8);
      colName = this.drug_columns[randomColumn];
    }
    let categoriesSize = this.selectedCategories.length;
    if (categoriesSize > 0) {
      let randomCategory = Math.floor(Math.random() * categoriesSize);
      colName = this.selectedCategories[randomCategory];
      console.log('Selected category:', colName);
    }
    // TODO Fix this
    console.log('COL ANME');
    console.log(colName);
    this.targetAnswer = this.drugs[randomDrug][colName];
    if (colName == 'Brand_name') colName = this.pickBrandOrGeneric(randomDrug);
    while (
      this.targetAnswer == undefined ||
      this.targetAnswer == '' ||
      this.targetAnswer.length <= 1
    ) {
      randomColumn = Math.floor(Math.random() * 9);
      colName = this.drug_columns[randomColumn];
      this.targetAnswer = this.drugs[randomDrug][colName];
    }
    console.log(this.drugs);
    console.log(`What is the ${colName} of ${randomDrug}?`);
    return `What is the ${colName.replaceAll('_', ' ')} of ${randomDrug}?`;
  }

  pickBrandOrGeneric(drug: string): string {
    let brandOrGeneric = Math.floor(Math.random() * 2);
    if (brandOrGeneric == 0) {
      return 'Brand_name';
    } else {
      this.targetAnswer = this.drugs[drug]['Brand_name'];
      return 'Generic_name';
    }
  }

  getRandomProperty(obj: any) {
    let keys = Object.keys(obj);
    let randomKey = keys[Math.floor(Math.random() * keys.length)];
    let randomProperty = obj[randomKey];
    return randomProperty;
  }
}
