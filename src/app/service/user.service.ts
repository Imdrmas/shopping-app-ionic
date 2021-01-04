import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart, Category, Shopping, User } from '../modal/Modal';

const USERNAME_KEY = 'AuthUsername';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  addUser(user: User): Observable<any> {
    return this.http.post<any>(`${this.url}/addUser`, user);
  }

  editUser(user: User, idUser: number): Observable<User> {
    return this.http.put<User>(`${this.url}/editUser/${idUser}`, user);
  }

  deleteUser(idUser: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/deleteUser/${idUser}`);
  }

  findCartsToUser(idUser: number): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.url}/findCartsToUser/${idUser}`);
  }

  findShoppingToUser(idUser: number): Observable<Shopping[]> {
    return this.http.get<Shopping[]>(`${this.url}/findShoppingToUser/${idUser}`);
  }

  findUserById(idUser: number): Observable<User> {
    return this.http.get<User>(`${this.url}/findUserById/${idUser}`);
  }

  findUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.url}/findUserByUsername/${username}`);
  }

  public saveUsername(username: string) {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }
  
  public getUsername(): string {
    return sessionStorage.getItem(USERNAME_KEY);
  }

  public signOut() {
    window.sessionStorage.clear();
  }
}
