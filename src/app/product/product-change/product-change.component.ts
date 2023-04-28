import { Component } from '@angular/core';
import { Product } from '../product.class';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VendorService } from 'src/app/vendor/vendor.service';
import { Vendor } from 'src/app/vendor/vendor.class';

@Component({
  selector: 'app-product-change',
  templateUrl: './product-change.component.html',
  styleUrls: ['./product-change.component.css']
})
export class ProductChangeComponent {

  product!: Product;
  pageTitle = "Product Change";
  vendors!: Vendor[];

    constructor(
    private proSvc : ProductService,
    private venSvc: VendorService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  save(): void{
    this.product.vendorId = +this.product.vendorId;
    console.debug("Product:", this.product);
    this.proSvc.change(this.product).subscribe({
      next: (res) => {
        console.debug("Product Changed!");
        this.router.navigateByUrl("/product/list");
      },
      error: (err) =>{
        console.error(err);
      }
    });
  } 
  ngOnInit():void{
    this.venSvc.list().subscribe({
      next: (res)=>{
        console.debug("Product:", res);
        this.vendors = res;
      },
      error:(err)=>{
        console.error(err);
    }
  });
    let id = this.route.snapshot.params["id"];
    this.proSvc.get(id).subscribe({
      next: (res)=>{
        console.debug("Product:", res);
        this.product = res;
      },
      error:(err)=>{
        console.error(err);
      }
    });
  }
}
