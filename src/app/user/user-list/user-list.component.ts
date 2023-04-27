import { Component } from '@angular/core';
import { User } from '../user.class';
import { SystemService } from 'src/app/core/system.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {

  pageTitle="User List";
  users: User[] = [];
  constructor(
    private sys: SystemService,
    private userSvc: UserService
  ){}

  ngOnInit(): void{
    this.sys.chkLogin();
    if(this.sys.loggedInUser !== null){
      console.log("Someone is logged in!");
    } else {
      console.log("No one is logged in..");
    }
    this.userSvc.list().subscribe({
      next: (res) => {
        console.debug("Users:", res);
        this.users = res;
      },
      error: (err) =>{
        console.error(err);
      }
    });
  }
}
