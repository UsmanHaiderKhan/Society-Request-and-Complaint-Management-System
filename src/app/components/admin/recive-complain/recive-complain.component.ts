import { Component, OnInit } from '@angular/core';
import { ComplainService } from '../../shared/services/complain.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-recive-complain',
  templateUrl: './recive-complain.component.html',
  styleUrls: ['./recive-complain.component.scss'],
})
export class ReciveComplainComponent implements OnInit {
  complain: any;
  optionsSelect: Array<any>;
  constructor(
    public complainService: ComplainService,
    public dialog: MatDialog
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
    this.complainService.getAllComplains().subscribe((data) => {
      this.complain = data.map((e) => {
        return {
          id: e.payload.doc.id,
          isedit: false,
          fullname: e.payload.doc.data()['fullname'],
          email: e.payload.doc.data()['email'],
          address: e.payload.doc.data()['address'],
          phonenumber: e.payload.doc.data()['phonenumber'],
          complainType: e.payload.doc.data()['complainType'],
          complainDetails: e.payload.doc.data()['complainDetails'],
        };
      });
    });
  }
  public editComplain(complain) {
    complain.editfullname = complain.fullname;
    complain.editemail = complain.email;
    complain.editaddress = complain.address;
    complain.editphonenumber = complain.phonenumber;
    complain.editcomplainType = complain.complainType;
    complain.editcomplainDetails = complain.complainDetails;
  }
  public deleteComplain(complainId) {
    this.complainService.deleteComplainData(complainId);
  }
  public updateComplain(recordComplain) {
    let complain = {};
    complain['fullname'] = recordComplain.editfullname;
    complain['email'] = recordComplain.editemail;
    complain['phonenumber'] = recordComplain.editphonenumber;
    complain['address'] = recordComplain.editaddress;
    complain['complainType'] = recordComplain.editcomplainType;
    complain['complainDetails'] = recordComplain.editcomplainDetails;
    // here calling service
    this.complainService.updateComplainData(recordComplain.id, complain);
  }
}
