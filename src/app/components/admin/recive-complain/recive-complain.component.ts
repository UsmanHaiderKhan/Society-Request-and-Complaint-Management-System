import { Component, OnInit, ViewChild } from '@angular/core';
import { ComplainService } from '../../shared/services/complain.service';
import { NotificationService } from '../../shared/services/notification.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ComplainComponent } from '../../home/complain/complain.component';

@Component({
  selector: 'app-recive-complain',
  templateUrl: './recive-complain.component.html',
  styleUrls: ['./recive-complain.component.scss'],
})
export class ReciveComplainComponent implements OnInit {
  complain: any;
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
    'complainType',
    'complainDetail',
    'actions',
  ];

  constructor(
    public complainService: ComplainService,
    public dialog: MatDialog,
    public notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.optionsSelect = [
      { value: 'Normal', label: 'Normal' },
      { value: 'Severe', label: 'Severe' },
      { value: 'Urgent', label: 'Urgent' },
    ];
  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.width = '70%';
    dialogConfig.autoFocus = true;

    this.dialog.open(ReciveComplainComponent, dialogConfig);
  }
  public loadData() {
    this.complainService.getAllComplains().subscribe((list) => {
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

  public deleteComplain(complainId) {
    this.complainService.deleteComplainData(complainId);
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onEdit(row) {
    this.complainService.complainEditForm(row);
    let config = new MatDialogConfig();

    // (config.disableClose = true),
    (config.width = '60%'), (config.height = '80%');
    this.dialog.open(ComplainComponent, config);
  }

  onDelete($key) {
    if (confirm('Are you Sure you Want to Delete Record?')) {
      this.complainService.deleteComplainData($key);
      this.notificationService.danger('Deleted SuccessFully');
    }
  }
}
