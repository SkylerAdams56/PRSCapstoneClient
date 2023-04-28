import { Component } from '@angular/core';
import { Request } from '../request.class';
import { User } from 'src/app/user/user.class';
import { RequestService } from '../request.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { SystemService } from 'src/app/core/system.service';

@Component({
  selector: 'app-request-create',
  templateUrl: './request-create.component.html',
  styleUrls: ['./request-create.component.css']
})
export class RequestCreateComponent {

  request:Request = new Request();
  users!: User[];
  pageTitle = "Request Create";
  

  constructor(
    private reqSvc: RequestService,
    private sysSvc: SystemService,
    private userSvc:UserService,
    private router: Router

  ) {}

  save(): void{
    this.request.userId = Number(this.request.userId);
    this.reqSvc.create(this.request).subscribe({
      next: (res) =>{
        console.debug("User created!");
        this.router.navigateByUrl("/request/list");
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  ngOnInit():void {
    this.request.userId = this.sysSvc.loggedInUser?.id
    this.userSvc.list().subscribe({
      next:(res) => {
        console.debug("Users:", res);
        this.users = res;
      },
      error: (err) => {
        console.error(err);
      }
    })
    
    
  }
  
}
