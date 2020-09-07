import { Component, OnInit, ViewChild } from '@angular/core';
import { OperationService } from '../../shared/services/operation.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NotificationService } from '../../shared/services/notification.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RequestComponent } from '../../home/request/request.component';

@Component({
  selector: 'app-recive-request',
  templateUrl: './recive-request.component.html',
  styleUrls: ['./recive-request.component.scss'],
})
export class ReciveRequestComponent implements OnInit {
  request: any;
  optionsSelect: Array<any>;
  listData: MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  displayedColumns: string[] = [
    'imageUrl',
    'fullname',
    'email',
    'address',
    'mobile',
    'requestType',
    'requestDetail',
    'actions',
  ];

  constructor(
    public operationService: OperationService,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    // debugger;

    this.optionsSelect = [
      { value: 'Normal', label: 'Normal' },
      { value: 'Severe', label: 'Severe' },
      { value: 'Urgent', label: 'Urgent' },
    ];
    this.loadData();
  }

  loadData() {
    this.operationService.getAllRequests().subscribe((list) => {
      let array = list.map((item) => {
        return { $key: item.key, ...item.payload.val() };
      });
      this.listData = new MatTableDataSource(array);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
      this.listData.filterPredicate = (data, filter) => {
        return this.displayedColumns.some((ele) => {
          return (
            ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1
          );
        });
      };
    });
  }

  public deleteRequest($key: string) {
    this.operationService.deleteRequestData($key);
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }
  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
  onEdit(row) {
    this.operationService.editForm(row);
    let config = new MatDialogConfig();

    (config.width = '60%'), (config.height = '80%');
    this.dialog.open(RequestComponent, config);
  }
  onDelete($key) {
    if (confirm('Are you Sure you Want to Delete Record?')) {
      this.operationService.deleteRequestData($key);
      this.notificationService.danger('Deleted SuccessFully');
    }
  }
}
