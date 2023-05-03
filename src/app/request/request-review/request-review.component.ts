import { Component } from '@angular/core';
import { RequestService } from '../request.service';
import { Request } from '../request.class';
import { SystemService } from 'src/app/core/system.service';
import { User } from 'src/app/user/user.class';

@Component({
  selector: 'app-request-review',
  templateUrl: './request-review.component.html',
  styleUrls: ['./request-review.component.css']
})
export class RequestReviewComponent {
  pageTitle = 'Request Review';
  requests: Request[] = [];
  currentUser: User | null = null;

  constructor(
    private reqSvc: RequestService,
    private sysSvc: SystemService
  ) {}

  review(request: Request): void {
    if (request.total <= 50) {
      request.status = 'APPROVED';
    } else {
      request.status = 'REVIEW';
    }
    this.reqSvc.change(request, request.id).subscribe({
      next: (res) => {
        console.debug('Request Reviewed');
        this.refresh();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  refresh(): void {
    this.currentUser = this.sysSvc.loggedInUser;
    this.reqSvc.list().subscribe({
      next: (res) => {
        console.debug('Requests:', res);
        // Filter out requests for the current user
        this.requests = res.filter((r) => r.userId !== this.currentUser?.id  && r.status === 'REVIEW');
        for (let r of this.requests) {
          r.userName = r.user !== null ? r.user.firstname : 'No User';
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  ngOnInit(): void {
    this.refresh();
  }
}
