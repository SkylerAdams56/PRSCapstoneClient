import { Component } from '@angular/core';
import { Requestline } from '../requestline.class';
import { Product } from 'src/app/product/product.class';
import { Request } from 'src/app/request/request.class';
import { RequestlineService } from '../requestline.service';
import { ProductService } from 'src/app/product/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-requestline-change',
  templateUrl: './requestline-change.component.html',
  styleUrls: ['./requestline-change.component.css']
})
export class RequestlineChangeComponent {

  requestLine: Requestline = new Requestline();
  pageTitle = "Requestline Change";
  requests!: Request[];
  products!: Product[];

  constructor(
    private reqLSvc: RequestlineService,
    private proSvc: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  save(): void {
    this.requestLine.requestId = +this.requestLine.requestId;
    this.requestLine.productId = +this.requestLine.productId;
    console.debug("Requestline:", this.requestLine);
    this.reqLSvc.change(this.requestLine).subscribe({
      next: (res) => {
        console.debug("Requestline Changed!");
        this.router.navigateByUrl(`/request/lines/${this.requestLine.requestId}`);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
    ngOnInit(): void {
      this.requestLine.id = +this.route.snapshot.params["id"];
      this.requestLine.requestId = +this.requestLine.requestId;
      this.requestLine.quantity = +this.requestLine.quantity;
      this.proSvc.list().subscribe({
        next: (res) => {
          console.debug("Products:", res);
          this.products = res;
        },
        error: (err) => {
          console.error(err);
        }
      });
      this.reqLSvc.get(this.requestLine.id).subscribe({
        next: (res) => {
          console.debug("requestline:", res)
          this.requestLine = res;
        },
        error: (err) => {
          console.error(err);
        }
      });
  }
}
