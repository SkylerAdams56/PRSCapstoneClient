import { Component } from '@angular/core';
import { Product } from '../product.class';
import { SystemService } from 'src/app/core/system.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  pageTitle="Product List";
  products: Product[]=[];
  constructor(
    private sys: SystemService,
    private proSvc: ProductService
  ){}

  refresh():void{
    this.proSvc.list().subscribe({
      next: (res) => {
        console.debug("Orders:", res);
        this.products = res;
        for(let p of this.products){
          p.name = p.vendor !== null ? p.vendor.name : "No Customer";
        }
      },
      error: (err) =>{
        console.error(err);
      }
    });
  }

  ngOnInit():void{
    this.refresh();
  }
}
