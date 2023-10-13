import { Component, Input, Inject } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { Dialog, DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { NgFor } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { DataReturn } from 'src/app/model/product.model';
import { CartService } from 'src/app/service/cart.service';
export interface DialogData {
  name: string;
  productCategory: Product[];
  return: DataReturn
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})

export class ProductComponent {
  @Input() name: string = "";
  @Input() code: string = "";
  @Input() productCategory: Product[] = [];
  
  constructor(public dialog: Dialog, private cartService: CartService) {}
  
  openDialog(): void {
    const dialogRef = this.dialog.open<DataReturn>(ProductDialog, {
      width: '250px',
      data: {name: this.name, productCategory: this.productCategory, return: {name: this.name}},
    });

    dialogRef.closed.subscribe(result => {
      if(result && result.amount && result.product_option.product_guid && result.product_option.unit_name)
        this.cartService.sendData(result);
    });
  }
}

@Component({
  selector: 'product-dialog',
  templateUrl: 'product-dialog.html',
  standalone: true,
  imports: [
    MatChipsModule, 
    NgFor, 
    MatButtonModule, 
    MatDividerModule, 
    MatCardModule, 
    MatFormFieldModule, 
    MatInputModule,
    FormsModule
  ]
})
export class ProductDialog {
  constructor(public dialogRef: DialogRef<DataReturn>, @Inject(DIALOG_DATA) public data: DialogData) {}
}
