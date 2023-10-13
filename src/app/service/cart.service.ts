import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataReturn } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = new BehaviorSubject<DataReturn>({} as DataReturn);
  public cartData$ = this.cart.asObservable();

  sendData(data: DataReturn) {
    this.cart.next(data);
  }
}
