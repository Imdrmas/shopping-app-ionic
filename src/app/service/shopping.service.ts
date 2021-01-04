import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart, Category, Product, Shopping } from '../modal/Modal';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  
  private url = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  addShoppingToUser(shopping: Shopping, idUser: number): Observable<Shopping> {
    return this.http.post<Shopping>(`${this.url}/addShoppingToUser/${idUser}`, shopping);
  }

  addCategoryToShopping(category: Category, idShopping: number): Observable<Category> {
    return this.http.post<Category>(`${this.url}/addCategoryToShopping/${idShopping}`, category);
  }

  addCartToUser(cart: Cart, idUser: number): Observable<Cart> {
    return this.http.post<Cart>(`${this.url}/addCartToUser/${idUser}`, cart);
  }

  addProductToCart(product: Product, idCart: number): Observable<Product> {
    return this.http.post<Product>(`${this.url}/addProductToCart/${idCart}`, product);
  }

  addProductToCategory(product: Product, idCategory: number): Observable<Product> {
    return this.http.post<Product>(`${this.url}/addProductToCategory/${idCategory}`, product);
  }

  findCategoriesToShopping(idShopping: number): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.url}/findCategoriesToShopping/${idShopping}`);
  }
  
  findCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.url}/findCategories`);
  }
  findProductsToCategory(idProduct: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/findProductsToCategory/${idProduct}`);
  }
  findProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/findProducts`);
  }
  private cart = [];

  getCart() {
    return this.cart;
  }
  addProduct(product: any) {
    this.cart.push(product);
  }
}
