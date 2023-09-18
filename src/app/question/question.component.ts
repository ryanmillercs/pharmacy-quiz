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
    'Target',
    'Target_class_location',
    'Target_normal_role',
    'Mechanism_of_action',
  ];
  currentQuestion = '';
  targetAnswer = '';
  currentAnswer = '';
  drugs: any;

  ngOnInit() {
    console.log('QuestionComponent initialized');
    this.drugs = this.dataService.getDrugs();
    console.log(this.drugs);
    this.currentQuestion = this.getRandomQuestion();
  }

  submitAnswer() {
    console.log(this.currentAnswer);
    // if(this.currentAnswer == this.targetAnswer) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        answer: this.targetAnswer,
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.currentQuestion = this.getRandomQuestion();
    });
    // }
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

    this.targetAnswer = this.drugs[randomDrug][colName];
    if (this.targetAnswer == undefined) {
      this.targetAnswer = this.drugs[randomDrug]['Brand_name'];
    }

    return `What is the ${colName.replaceAll('_', ' ')} of ${randomDrug}?`;
  }

  getRandomProperty(obj: any) {
    let keys = Object.keys(obj);
    let randomKey = keys[Math.floor(Math.random() * keys.length)];
    let randomProperty = obj[randomKey];
    return randomProperty;
  }
}
