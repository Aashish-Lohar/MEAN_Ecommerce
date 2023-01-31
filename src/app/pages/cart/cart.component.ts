import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: Cart = {items:[{
    product:'https://via.placeholder.com/150',
    name:'shoes',
    price:150,
    quantity:1,
    id:1
  },
  {
    product:'https://via.placeholder.com/150',
    name:'shoes',
    price:150,
    quantity:3,
    id:1
  }
]}

  dataSource:Array<CartItem> = [];
  displayedColumns:String[] = ['product','name','price','quantity','total','action']
  constructor( private cartService:CartService) { }

  ngOnInit(): void {
    this.dataSource = this.cart.items;
    this.cartService.cart.subscribe((_cart)=>{
      this.cart = _cart;
      this.dataSource = this.cart.items;
    })
  }

  getTotal(items:CartItem[]):number{
    return this.cartService.getTotal(items);
  }

  onClearCart(){
    this.cartService.clearCart();
  }

  onRemoveFromCart(item:CartItem){
    this.cartService.removeFromCart(item);
  }

  onAddItem(item:CartItem){
    this.cartService.addToCart(item);
  }
  onRemoveItem(item:CartItem){
    this.cartService.removeItem(item);
  }

}
