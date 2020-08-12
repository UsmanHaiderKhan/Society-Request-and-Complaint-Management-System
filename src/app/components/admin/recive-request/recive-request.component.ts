import { Component, OnInit } from '@angular/core';
import { OperationService } from '../../shared/services/operation.service';

@Component({
  selector: 'app-recive-request',
  templateUrl: './recive-request.component.html',
  styleUrls: ['./recive-request.component.scss'],
})
export class ReciveRequestComponent implements OnInit {
  request: any;
  optionsSelect: Array<any>;
  constructor(public operationService: OperationService) {}

  ngOnInit() {
    // debugger;
    this.loadData();
    this.optionsSelect = [
      { value: 'Normal', label: 'Normal' },
      { value: 'Severe', label: 'Severe' },
      { value: 'Urgent', label: 'Urgent' },
    ];
  }

  public loadData() {
    this.operationService.getAllRequests().subscribe((data) => {
      this.request = data.map((e) => {
        return {
          id: e.payload.doc.id,
          fullname: e.payload.doc.data()['fullname'],
          email: e.payload.doc.data()['email'],
          address: e.payload.doc.data()['address'],
          phonenumber: e.payload.doc.data()['phonenumber'],
          requestType: e.payload.doc.data()['requestType'],
          requestDetails: e.payload.doc.data()['requestDetails'],
          imageUrl: e.payload.doc.data()['imageUrl'],
        };
      });
    });
  }
  public editRequest(request) {
    request.editfullname = request.fullname;
    request.editemail = request.email;
    request.editaddress = request.address;
    request.editphonenumber = request.phonenumber;
    request.editrequestType = request.requestType;
    request.editrequestDetails = request.requestDetails;
  }
  public deleteRequest($key: string) {
    this.operationService.deleteRequestData($key);
  }
  public updateRequest(recordRequest) {}
}
