import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
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
    name:'shoes adidas',
    price:250,
    quantity:1,
    id:2
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
  constructor( private cartService:CartService,private http:HttpClient) { }

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

  onClearCart():void{
    this.cartService.clearCart();
  }

  onRemoveFromCart(item:CartItem):void{
    this.cartService.removeFromCart(item);
  }

  onAddItem(item:CartItem):void{
    this.cartService.addToCart(item);
  }
  onRemoveItem(item:CartItem):void{
    this.cartService.removeItem(item);
  }
  onCheckout():void{
    this.http.post('http://localhost:4242/checkout',{
      items:this.cart.items
    }).subscribe( async (res:any)=>{
      let stripe = await loadStripe('pk_test_51MMW2PSARWQdi33XL14tieK8XV0tW3rJOzYYeMjnzaYPufid6ZVSyIFp9SpOwBoEKpvYmjC7Yje0eJ47NosCpMKs00SfFSLWWd')
      stripe?.redirectToCheckout({
        sessionId:res.id
      })
    })
  }

}
