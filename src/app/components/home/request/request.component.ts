import { Component, OnInit } from '@angular/core';
import { OperationService } from '../../shared/services/operation.service';
interface FeaturedPhotosUrl {
  url1?: string;
  url2?: string;
}
@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
})
export class RequestComponent implements OnInit {
  optionsSelect: Array<any>;

  request: string;
  fullname: string;
  email: string;
  address: string;
  phonenumber: number;
  requestType: string;
  requestDetails: string;
  message: string;
  constructor(public operationService: OperationService) {}

  ngOnInit() {
    this.optionsSelect = [
      { value: 'Normal', label: 'Normal' },
      { value: 'Severe', label: 'Severe' },
      { value: 'Urgent', label: 'Urgent' },
    ];
  }
  submitRequest() {
    let Request = {};
    Request['fullname'] = this.fullname;
    Request['email'] = this.email;
    Request['address'] = this.address;
    Request['phonenumber'] = this.phonenumber;
    Request['requestType'] = this.requestType;
    Request['requestDetails'] = this.requestDetails;
    this.operationService
      .submitRequest(Request)
      .then((res) => {
        this.fullname = '';
        this.email = '';
        this.address = '';
        this.phonenumber = undefined;
        this.requestType = '';
        this.requestDetails = '';
        console.log(res);
        this.message = 'Request has been Submitted Successfully.';
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // selectedPhoto(event: any) {
  //   const file: File = event.target.files[0];
  //   const metaData = { contentType: file.type };
  //   const storeageRef: firebase.storage.Reference = firebase
  //     .storage()
  //     .ref('/photo/featured/urls');
  //   storeageRef.put(file, metaData);
  //   console.log('Uploading: ' + file.name);
  // }
}
