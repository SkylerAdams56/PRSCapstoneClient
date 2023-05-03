import { Component } from '@angular/core';
import { Product } from '../product.class';
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
    private proSvc: ProductService

  ){}

  ngOnInit():void{
    this.proSvc.list().subscribe({
      next: (res) => {
        console.debug("Products:", res);
        this.products = res;
        for(let p of this.products){
          console.log('vendor:', p.vendor)
          p.vendorName = p.vendor !== null ? p.vendor.name : "No Vendor";
        }
      },
      error: (err) =>{
        console.error(err);
      }
    });
   }
  }

