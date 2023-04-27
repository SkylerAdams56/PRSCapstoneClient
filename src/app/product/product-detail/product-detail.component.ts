import { Component } from '@angular/core';
import { Product } from '../product.class';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {

  product!: Product;
  pageTitle="Product Detail";
  showVerifyRemove: boolean= false;

  constructor(
    private proSvc: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  remove():void{
    this.showVerifyRemove = !this.showVerifyRemove;
  }

  removeVerified():void{
    this.proSvc.remove(this.product.id).subscribe({
      next: (res) =>{
        console.debug("Product Removed!");
        this.router.navigateByUrl("/product/list");
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  ngOnInit():void{
    let id =Number(this.route.snapshot.params["id"]);
    this.proSvc.get(id).subscribe({
      next: (res) => {
        console.debug("Product:",res);
        this.product=res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
