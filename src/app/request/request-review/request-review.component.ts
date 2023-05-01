import { Component } from '@angular/core';
import { RequestService } from '../request.service';
import { Request } from '../request.class'

@Component({
  selector: 'app-request-review',
  templateUrl: './request-review.component.html',
  styleUrls: ['./request-review.component.css']
})
export class RequestReviewComponent {

  pageTitle="Request Review";
  requests: Request[]=[];

  constructor(
    private reqSvc: RequestService
  ){}

  review(request: Request): void{
    if(request.total <= 50){
      request.status = "APPROVED";
    }
    else{
      request.status = "REVIEW";
    }
    this.reqSvc.change(request, request.id).subscribe({
      next: (res) => {
        console.debug("Request Reviewed");
        this.refresh();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  refresh():void{
    this.reqSvc.list().subscribe({
      next: (res) => {
        console.debug("Requests:", res);
        this.requests = res;
        for(let r of this.requests){
          r.userName = r.user !== null ? r.user.firstname : "No User";
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
