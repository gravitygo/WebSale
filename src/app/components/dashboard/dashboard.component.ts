import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/service/database.service';
import { ProductList } from 'src/app/model/product.model';
import { DataReturn } from '../../model/product.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  productList: ProductList[] = [];
  rowHeight: string = "30em"
  constructor(
    private databaseService: DatabaseService,
  ) {}

  ngOnInit(): void {
    this.databaseService.getProducts().subscribe(data => {
      this.productList = data;
    });
  }

  setProducts(products: ProductList[]){
    this.productList = products;
  }
}
