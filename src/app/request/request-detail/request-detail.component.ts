import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Request } from '../request.class'
import { RequestService } from '../request.service';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent {

  request!: Request;
  pageTitle ="Request Detail";
  showVerifyRemove: boolean= false;

  constructor(
    private reqSvc: RequestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  remove():void{
    this.showVerifyRemove = !this.showVerifyRemove;
  }
  
  removeVerified():void{
    this.reqSvc.remove(this.request.id).subscribe({
      next: (res) => {
        console.debug("Request Removed!");
        this.router.navigateByUrl("/request/list");
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  ngOnInit():void{
    let id = Number(this.route.snapshot.params["id"]);
    this.reqSvc.get(id).subscribe({
      next: (res) => {
        console.debug("Request:",res);
        this.request = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
