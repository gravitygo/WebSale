import { Component, Inject, OnDestroy, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CartService } from 'src/app/service/cart.service';
import { Cart } from 'src/app/model/product.model';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { DialogRef, DIALOG_DATA, Dialog } from '@angular/cdk/dialog';
import { DialogData } from '../product/product.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnDestroy {
  cartContent: Cart = {};
  private cartSubscription: Subscription;

  constructor(public dialog: Dialog, private cartService: CartService) {
    this.cartSubscription = this.cartService.cartData$.subscribe(data => {
      if (data && data.product_option && data.product_option.product_guid) {
        const productGuid = data.product_option.product_guid;
        
        // Check if the product_guid already exists in cartContent
        if (this.cartContent[productGuid]) {
          // If it does, update the amount
          this.cartContent[productGuid].amount += data.amount;
        } else {
          // If it doesn't, create a new entry
          this.cartContent[productGuid] = { ...data, amount: data.amount };
        }
      }
    });
  }
  
  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

  increment(guid: string): void{
    this.cartContent[guid].amount++;
  }

  decrement(guid: string): void{
    this.cartContent[guid].amount--;
    if(!this.cartContent[guid].amount)
      delete this.cartContent[guid];
  }
  
  openDialog(type: number): void {
    if(type){
      const dialogRef = this.dialog.open<Number>(NewSaleDialog, {
        width: '250px',
        data: {name: ""},
      });
  
      dialogRef.closed.subscribe(value => {
        if(value){
          this.cartContent = {};
        }
      });
    }else{
      const dialogRef = this.dialog.open<Number>(NewSaleDialog, {
        width: '250px',
        data: {name: ""},
      });
  
      dialogRef.closed.subscribe(value => {
        if(value)
          this.cartContent = {};
      });
    }
  }

  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
}


@Component({
  selector: 'new-sale',
  templateUrl: 'new-sale.html',
  standalone: true,
  imports: [ 
    MatButtonModule, 
    MatDividerModule, 
    MatCardModule, 
    MatFormFieldModule, 
    MatInputModule,
    FormsModule
  ]
})
export class NewSaleDialog {
  constructor(public dialogRef: DialogRef<Number>, @Inject(DIALOG_DATA) public data: DialogData) {}
}