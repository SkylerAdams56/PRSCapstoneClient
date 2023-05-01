import { Component } from '@angular/core';
import { Requestline } from '../requestline.class';
import { Product } from 'src/app/product/product.class';
import { Request } from 'src/app/request/request.class';
import { RequestService } from 'src/app/request/request.service';
import { RequestlineService } from '../requestline.service';
import { ProductService } from 'src/app/product/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-requestline-change',
  templateUrl: './requestline-change.component.html',
  styleUrls: ['./requestline-change.component.css']
})
export class RequestlineChangeComponent {

  requestLine!: Requestline;
  pageTitle = "Requestline Change";
  requests!: Request[];
  products!: Product[];

  constructor(
    private reqLSvc: RequestlineService,
    private reqSvc: RequestService,
    private proSvc: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  save(): void {
    this.requestLine.id = +this.requestLine.id;
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
      this.requestLine.requestId = +this.route.snapshot.params["id"];
      this.proSvc.list().subscribe({
        next: (res) => {
          console.debug("Products:", res);
          this.products = res;
        },
        error: (err) => {
          console.error(err);
        }
      });
  }
}
