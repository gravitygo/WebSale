import { Component, EventEmitter, Output } from '@angular/core';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { ProductList } from 'src/app/model/product.model';
import { DatabaseService } from 'src/app/service/database.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  @Output() products = new EventEmitter<ProductList[]>();
  products$!: Observable<ProductList[]>;
  private searchTerms = new Subject<string>();
  
  constructor(private databaseService: DatabaseService){}

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.products$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => term ? this.databaseService.searchProducts(term): this.databaseService.getProducts()),
    );

    // Subscribe to the products$ observable and emit results using the EventEmitter
    this.products$.subscribe((searchResults: ProductList[]) => {
      this.products.emit(searchResults);
    });
  }
}
