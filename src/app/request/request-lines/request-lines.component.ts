import { Component } from '@angular/core';
import { SystemService } from 'src/app/core/system.service';
import { RequestService } from '../request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Requestline } from 'src/app/requestline/requestline.class';
import { Request } from '../request.class'

@Component({
  selector: 'app-request-lines',
  templateUrl: './request-lines.component.html',
  styleUrls: ['./request-lines.component.css']
})
export class RequestLinesComponent {

  pageTitle = "Request Lines";
  request!: Request;
  showVerifyRemove!: boolean;
  constructor(
    private sysSvc: SystemService,
    private reqSvc: RequestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  review():void{

  }

  remove():void{
    this.reqSvc.remove(this.request.id).subscribe({
      next: (res) => {
        console.debug("Request Removed!");
        this.router.navigateByUrl(`/request/lines/${this.request.id}`);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }


  ngOnInit():void{
    let id = this.route.snapshot.params["id"];
    this.reqSvc.get(id).subscribe({
      next: (res) => {
        console.debug("Request:",res);
        this.request = res;
      },
      error: (err) =>{
        console.error(err);
      }
    })
  }

}
