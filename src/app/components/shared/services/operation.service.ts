import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root',
})
export class OperationService {
  constructor(public firebase: AngularFireDatabase) {}
  requetList: AngularFireList<any>;

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    fullname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    address: new FormControl('', Validators.required),
    mobile: new FormControl('', [Validators.required]),
    requestType: new FormControl(1),
    imageUrl: new FormControl(''),
    requestDetail: new FormControl(''),
  });
  // Initialize
  onInitialLizeFormGroup() {
    this.form.setValue({
      $key: null,
      fullname: '',
      email: '',
      address: '',
      mobile: '',
      requestType: '1',
      imageUrl: '',
      requestDetail: '',
    });
  }
  //Get Method
  getAllRequests() {
    this.requetList = this.firebase.list('request');
    return this.requetList.snapshotChanges();
  }
  //Add Method
  submitRequest(request) {
    this.requetList = this.firebase.list('request');
    this.requetList.push({
      fullname: request.fullname,
      email: request.email,
      address: request.address,
      mobile: request.mobile,
      requestType: request.requestType,
      imageUrl: request.imageUrl,
      requestDetail: request.requestDetail,
    });
  }

  // getEmployees() {
  //   this.re = this.firebase.list('employees');
  //   return this.employeeList.snapshotChanges();
  // }
  //Update Method
  updateRequest(request) {
    this.requetList.update(request.$key, {
      fullname: request.fullname,
      email: request.email,
      address: request.address,
      mobile: request.mobile,
      requestType: request.requestType,
      imageUrl: request.imageUrl,
      requestDetail: request.requestDetail,
    });
  }
  //Delete Method
  deleteRequestData($key: string) {
    this.requetList.remove($key);
  }
  //
  // editForm(request) {
  //   this.form.setValue(_.omit(request));
  // }
}
