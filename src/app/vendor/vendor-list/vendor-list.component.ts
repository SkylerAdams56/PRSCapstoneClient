import { Component } from '@angular/core';
import { Vendor } from '../vendor.class';
import { SystemService } from 'src/app/core/system.service';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent {

  pageTitle="Vendor List";
  vendors: Vendor[] = [];
  constructor(
    private sys: SystemService,
    private venSvc: VendorService
  ){}

  ngOnInit(): void{
    this.sys.chkLogin();
    if(this.sys.loggedInUser !== null){
      console.log("Someone is logged in!");
    } else {
      console.log("No onse is logged in..");
    }
    this.venSvc.list().subscribe({
      next: (res) => {
        console.debug("Vendors:", res);
        this.vendors = res;
      },
      error: (err) =>{
        console.error(err);
      }
    });
  }
}
