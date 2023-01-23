import { Component, OnInit } from '@angular/core';


const RowsHeight:{[id:number]:number} = {1:400, 3:355, 4:350}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cols = 3;
  rowHeight = RowsHeight[this.cols];
  category!:string;
  constructor() { }

  ngOnInit(): void {
  }

  onColumnsCountChange(colsNum:number):void{
    this.cols = colsNum;
    this.rowHeight = RowsHeight[this.cols];
  }
  onShowCategory(newCategory:string):void{
    this.category = newCategory;
  }

}
