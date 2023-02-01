import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../models/product.model'

const storeBaseUrl = 'https://fakestoreapi.com';
@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http:HttpClient) { }

  getAllProducts(limit = '12',sort = 'desc',category?:string):Observable<Product[]>{
    return this.http.get<Product[]>(`${storeBaseUrl}/products${category ? '/category/' + category:''}?sort=${sort}&limit=${limit}`);
  }
  getAllCategories():Observable<string[]>{
    return this.http.get<string[]>(`${storeBaseUrl}/products/categories`);
  }
}
