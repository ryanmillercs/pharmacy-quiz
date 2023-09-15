import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  constructor(private dataService: DataService) { }
  drug_columns = ["Brand_name", "Drug_class", "Indication", "Pharmacologic_activity", "Target",
    "Target_class_location", "Target_normal_role", "Mechanism_of_action",
  ];
  currentQuestion = "PLACEHOLDER";
  currentAnswer = "PLACEHOLDER"
  drugs: any;

  ngOnInit() {
    console.log("QuestionComponent initialized");
    this.drugs = this.dataService.getDrugs();
    console.log(this.drugs)
    this.currentQuestion = this.getRandomQuestion();
  }

  submitAnswer() {
    console.log(this.currentAnswer);
  }
  onInputFocusOut(event: any) {
    this.currentAnswer = event.target.value;
    console.log(this.currentAnswer);
  }

  getRandomQuestion() {
    let keys = Object.keys(this.drugs);
    let randomKey = keys[Math.floor(Math.random() * keys.length)];
    let randomDrug = this.drugs[randomKey];
    console.log(randomKey)
    console.log(randomDrug);
    // let randomQuestion = this.getRandomProperty(randomDrug);
    let randomColumn = Math.ceil(Math.random() * 8);
    console.log("RANDOM COLUMN")
    console.log(randomColumn);
    let colName = this.drug_columns[randomColumn]
    let randomQuestion = randomDrug[randomColumn];

    console.log("RANDOM QUESTION");
    console.log(randomQuestion);
    return `What is the ${colName} of ${randomKey}?`;
  }

  getRandomProperty(obj: any) {
    let keys = Object.keys(obj);
    let randomKey = keys[Math.floor(Math.random() * keys.length)];
    let randomProperty = obj[randomKey];
    return randomProperty;
  }


}
