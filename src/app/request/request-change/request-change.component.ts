import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/user/user.class';
import { UserService } from 'src/app/user/user.service';
import { RequestService } from '../request.service';
import { Request } from '../request.class';

@Component({
  selector: 'app-request-change',
  templateUrl: './request-change.component.html',
  styleUrls: ['./request-change.component.css']
})
export class RequestChangeComponent {

  request!: Request;
  pageTitle = "Request Change";
  users!: User[];

    constructor(
    private reqSvc : RequestService,
    private userSvc: UserService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  save(): void{
    this.request.userId = Number(this.request.userId);
    this.reqSvc.change(this.request, this.request.id).subscribe({
      next: (res) => {
        console.debug("Request Changed!");
        this.router.navigateByUrl("/request/list");
      },
      error: (err) =>{
        console.error(err);
      }
    });
  } 
  ngOnInit():void{
    this.userSvc.list().subscribe({
      next: (res)=>{
        console.debug("Request:", res);
        this.users = res;
      },
      error:(err)=>{
        console.error(err);
    }
  });
    let id = this.route.snapshot.params["id"];
    this.reqSvc.get(id).subscribe({
      next: (res)=>{
        console.debug("Request:", res);
        this.request = res;
      },
      error:(err)=>{
        console.error(err);
      }
    });
  }
}
