import { Component } from '@angular/core';
import { SystemService } from 'src/app/core/system.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  pageTitle = "User Login";
  username:string= "";
  password: string= "";
  message: string= "";
  constructor(
    private sys: SystemService,
    private userSvc: UserService,
    private router: Router
  ) {}

  login():void{
    this.userSvc.login(this.username, this.password).subscribe({
      next:(res) =>{
        console.debug("Login Successful");
        this.sys.loggedInUser = res;
        this.router.navigateByUrl("/home");
      }
    })
  }

}
