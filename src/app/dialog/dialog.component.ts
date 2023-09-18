import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface DialogData {
  answer: string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

export class DialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    console.log(data)
    this.answer = data.answer;
  }
   answer = "";

}
