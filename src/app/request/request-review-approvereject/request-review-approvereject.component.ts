import { Component } from '@angular/core';
import { RequestService } from '../request.service';
import { Request } from '../request.class'
import { RequestlineService } from 'src/app/requestline/requestline.service';
import { Requestline } from 'src/app/requestline/requestline.class';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-request-review-approvereject',
  templateUrl: './request-review-approvereject.component.html',
  styleUrls: ['./request-review-approvereject.component.css']
})
export class RequestReviewApproverejectComponent {

  pageTitle="Request Review Approve or Reject";
  requests: Request[]=[];
  request: Request = new Request();
  requestline!: Requestline;
  showVerifyReject: boolean = false;
  

  constructor(
    private reqSvc: RequestService,
    private reqLSvc: RequestlineService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  Approve(request: Request): void{
    
      request.status = "APPROVED";
    this.reqSvc.change(request, request.id).subscribe({
      next: (res) => {
        console.debug("Request Approved");
        this.refresh();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  Reject(request: Request): void {
    this.showVerifyReject = !this.showVerifyReject;
  }
  VerifyReject(request: Request): void{
    
    request.status = "REJECTED";
  this.reqSvc.change(request, request.id).subscribe({
    next: (res) => {
      console.debug("Request Rejected");
      this.refresh();
    },
    error: (err) => {
      console.error(err);
    }
  });
}

  refresh():void{
    let id = this.route.snapshot.params["id"];
    this.reqSvc.get(id).subscribe({
      next: (res) => {
        console.debug("Request:",res);
        this.request = res;
      },
      error: (err) =>{
        console.error(err);
      }
    });
    
  }

  ngOnInit():void{
    console.log("request review")
    this.refresh();
  }
}
