import { Component, OnInit, ViewChild, ViewChildren, AfterViewInit, QueryList } from '@angular/core';
import { Observable, merge, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

import { EmailsResponse } from '../../domain/email-response';
import { ViewOptions } from '../../domain/view-options';

// import from the folder!!
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { EmailService } from 'src/app/services/email-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-listing',
  templateUrl: './email-listing.component.html',
  styleUrls: ['./email-listing.component.scss'],
})
export class EmailListingComponent implements OnInit {

  data: EmailsResponse[] = [];
  tableColumns: string[] = ['fromEmail', 'toEmail', 'subject', 'description', 'fileName', 'uploadedBy', 'uploadedDate'];
  resultsLength = 0;
  pagesize = 10;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private emailService: EmailService, private router: Router) {
  }

  refresh(options: ViewOptions) {
    this.emailService.getEmails().subscribe((result: EmailsResponse[]) => {
      this.resultsLength = result?.length;
      this.data = result;
    });
  }

  ngOnInit() {

    // default data 
    this.refresh(this.getDefaultOptions());

    this.sort?.sortChange.subscribe((sort: Sort) => {
      console.log('sortChange', this.sort.active);
      this.paginator.pageIndex = 0;
      this.refresh(this.getCurrentOptions());
    });

    this.paginator?.page.subscribe((page: PageEvent) => {
      console.log('paginator ', page);
      this.refresh(this.getCurrentOptions());
    });

  }

  getCurrentOptions() {
    const options: ViewOptions = {
      sortField: this.sort.active,
      sortDirection: this.sort.direction,
      page: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize
    };

    return options;
  }

  getDefaultOptions() {
    const options: ViewOptions = {
      sortField: 'name',
      sortDirection: 'asc',
      page: 0, 
      pageSize: this.pagesize
    }; 
    
    return options;
  }

  public onSendEmail(event: any) {
    this.router.navigate(['/email']);
  }

}
