import { Component } from '@angular/core';
import { Product } from '../product.class';
import { SystemService } from 'src/app/core/system.service';
import { ProductService } from '../product.service';
import { VendorService } from 'src/app/vendor/vendor.service';
import { Vendor } from 'src/app/vendor/vendor.class';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  pageTitle="Product List";
  products: Product[]=[];
  vendors: Vendor[]=[];
  constructor(
    private sys: SystemService,
    private proSvc: ProductService,
    private venSvc: VendorService

  ){}

  refresh():void{
    this.proSvc.list().subscribe({
      next: (res) => {
        console.debug("Orders:", res);
        this.products = res;
      },
      error: (err) =>{
        console.error(err);
      }
    });
    this.venSvc.list().subscribe({
      next: (res) => {
        console.debug("Orders:", res);
        this.vendors = res;
      },
      error: (err) =>{
        console.error(err);
      }
    })
  }

  ngOnInit():void{
    this.refresh();
  }
}
