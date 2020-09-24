import { Component, OnInit } from '@angular/core';
import { OperationService } from '../../shared/services/operation.service';

@Component({
  selector: 'app-adminheader',
  templateUrl: './adminheader.component.html',
  styleUrls: ['./adminheader.component.scss'],
})
export class AdminheaderComponent implements OnInit {
  showFiller = false;
  currentSelected = 'home';
  count: number = 0;
  constructor(private requestService: OperationService) {}

  ngOnInit(): void {
    this.totalCount();
  }
  onSelected(navlink: string) {
    this.currentSelected = navlink;
    console.log(navlink);
  }
  totalCount() {
    this.requestService.getAllRequests().subscribe((res) => {
      this.count = res.length;
      console.log(this.count);
    });
  }
}
