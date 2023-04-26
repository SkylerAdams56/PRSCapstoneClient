import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user/user.class';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  loggedInUser: User | null = null;

  constructor(
    private router: Router
  ) { }

  chkLogin():void{
    if(this.loggedInUser === null){
      this.router.navigateByUrl("/user/login")
    }
  }
}
