import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent implements OnInit {
  constructor(private dataService: DataService, public dialog: MatDialog) {}
  drug_columns = [
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
  usedQuestions: { [key: string]: string } = {};
  currentQuestion = '';
  targetAnswer = '';
  currentAnswer = '';
  drugs: any;
  selectedCategories: string[] = [];
  isBackgroundRed = false;
  questionLimit = 0;
  remainingQuestions = 0;

  ngOnInit() {
    this.drugs = this.dataService.getCurrentDrugs();
    console.log(this.drugs);
    let question = this.getRandomQuestion();
    this.usedQuestions[question] = this.targetAnswer;
    this.currentQuestion = question;
    this.drugs.forEach((drug: any) => {
      Object.values(drug).forEach((value: any) => {
        if (value !== undefined && value !== '' && !value.match(/[0-9][0-9]/)) {
          this.questionLimit++;
        }
      });
    });
    this.remainingQuestions = this.questionLimit;
  }

  selectedChip() {
    console.log('Selected categories:', this.selectedCategories);
  }

  submitAnswer() {
    console.log(this.currentAnswer);
    const colMatch: RegExp = /(Brand name) | (Generic Name)/g;
    if (
      (this.currentQuestion.includes('Brand name') ||
        this.currentQuestion.includes('Generic name')) &&
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
          this.remainingQuestions--;
          // Prevent infinite loop
          if (this.remainingQuestions <= 0) {
            this.usedQuestions = {};
            this.remainingQuestions = this.questionLimit;
          }
        }
        this.currentQuestion = question;
        this.usedQuestions[question] = this.targetAnswer;
      });
      this.currentAnswer = '';
    }
  }

  onInputFocusOut(event: any) {
    this.currentAnswer = event.target.value;
    console.log(this.currentAnswer);
  }

  getRandomQuestion() {
    let randomDrugNumber = Math.floor(Math.random() * this.drugs.length);
    let randomColumn = Math.ceil(Math.random() * 8) - 1;
    let colName = this.drug_columns[randomColumn];
    let categoriesSize = this.selectedCategories.length;
    if (categoriesSize > 0) {
      let randomCategory = Math.floor(Math.random() * categoriesSize);
      colName = this.selectedCategories[randomCategory];
      console.log('Selected category:', colName);
    }
    // Keep generating random columns until we get one that is not undefined
    while (colName == undefined) {
      randomColumn = Math.ceil(Math.random() * 8) - 1;
      colName = this.drug_columns[randomColumn];
    }
    // Default to using Generic_name
    let randomDrugName = this.drugs[randomDrugNumber]['Generic_name'];
    this.targetAnswer = this.drugs[randomDrugNumber][colName];

    while (
      this.targetAnswer == undefined ||
      this.targetAnswer == '' ||
      this.targetAnswer.length <= 1
    ) {
      randomColumn = Math.floor(Math.random() * 9);
      colName = this.drug_columns[randomColumn];
      this.targetAnswer = this.drugs[randomDrugNumber][colName];
    }
    // If colName is Brand_name, then the question should be "What is the Generic_name of Brand_name?"
    // If colName is Generic_name, then the question should be "What is the Brand_name of Generic_name?"
    if (colName == 'Brand_name') {
      randomDrugName = this.drugs[randomDrugNumber]['Generic_name'];
    } else if (colName == 'Generic_name') {
      randomDrugName = this.drugs[randomDrugNumber]['Brand_name'];
    }
    console.log(this.drugs);
    console.log(`What is the ${colName} of ${randomDrugName}?`);
    return `What is the ${colName.replaceAll('_', ' ')} of ${randomDrugName}?`;
  }

  getRandomProperty(obj: any) {
    let keys = Object.keys(obj);
    let randomKey = keys[Math.floor(Math.random() * keys.length)];
    let randomProperty = obj[randomKey];
    return randomProperty;
  }
}
