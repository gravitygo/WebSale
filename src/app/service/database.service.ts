import { Injectable } from '@angular/core';
import { ProductList } from '../model/product.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<ProductList[]>{
    return this.http.get<ProductList[]>(`${this.url}/getProducts`);
  }

  /* GET heroes whose name contains search term */
  searchProducts(term: string): Observable<ProductList[]> {
    if (!term.trim()) 
      return of([]);
    
    return this.http.get<ProductList[]>(`${this.url}/searchProducts/?name=${term}`);
  }
  createOrder():Observable<String>{
    return this.http.post<String>(`${this.url}/postHeader`, null);
  }

  addProducts(cart: Cart):Observable<Cart>{
    this.createOrder().subscribe(val =>{
      return this.http.post<String>(`${this.url}/postHeader`, null);
    })
  }
}
