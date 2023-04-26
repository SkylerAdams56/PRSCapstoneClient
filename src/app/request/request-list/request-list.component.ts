import { Component } from '@angular/core';
import { Request } from '../request.class';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent {

  pageTitle="Request List";
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
        console.debug("Orders:", res);
        this.requests = res;
        for(let r of this.requests){
          r.userName = r.user !== null ? r.user.firstname : "No Customer";
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
