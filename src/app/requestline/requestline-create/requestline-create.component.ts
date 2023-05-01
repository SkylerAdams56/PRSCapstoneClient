import { Component } from '@angular/core';
import { Requestline } from '../requestline.class';
import { Product } from 'src/app/product/product.class';
import { Request } from 'src/app/request/request.class';
import { RequestlineService } from '../requestline.service';
import { RequestService } from 'src/app/request/request.service';
import { ProductService } from 'src/app/product/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-request-create',
  templateUrl: './requestline-create.component.html',
  styleUrls: ['./requestline-create.component.css']
})
export class RequestlineCreateComponent {

  requestLine: Requestline = new Requestline();
  pageTitle = "Requestline Create";
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
    this.requestLine.requestId = +this.requestLine.requestId;
    this.requestLine.productId = +this.requestLine.productId;
    console.debug("Requestline:", this.requestLine);
    this.reqLSvc.create(this.requestLine).subscribe({
      next: (res) => {
        console.debug("Requestline Created!");
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
