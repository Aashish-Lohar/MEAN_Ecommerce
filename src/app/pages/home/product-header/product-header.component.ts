import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { count } from 'rxjs';

@Component({
  selector: 'app-product-header',
  templateUrl: './product-header.component.html',
  styleUrls: ['./product-header.component.css']
})
export class ProductHeaderComponent implements OnInit {

  @Output() columnsCountChange = new EventEmitter<number>();
  @Output() itemsCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();
  sort = 'desc';
  itemsCount = 12;
  constructor() { }

  ngOnInit(): void {
  }

  onSortUpdated(newSort:string):void{
    this.sort = newSort;
    this.sortChange.emit(newSort);
  }
  onItemsUpdated(newCount:number):void{
    this.itemsCount = newCount;
    this.itemsCountChange.emit(newCount);
  }
  onColumnsUpdated(colsNum:number):void{
    this.columnsCountChange.emit(colsNum);
  }

}
