import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product-header',
  templateUrl: './product-header.component.html',
  styleUrls: ['./product-header.component.css']
})
export class ProductHeaderComponent implements OnInit {

  @Output() columnsCountChange = new EventEmitter<number>();
  sort = 'desc';
  itemsCount = 12;
  constructor() { }

  ngOnInit(): void {
  }

  onSortUpdated(newSort:string):void{
    this.sort = newSort;
  }
  onItemsUpdated(newCount:number):void{
    this.itemsCount = newCount;
  }
  onColumnsUpdated(colsNum:number):void{
    this.columnsCountChange.emit(colsNum);
  }

}
