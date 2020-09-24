import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root',
})
export class OperationService {
  constructor(public firebase: AngularFireDatabase) {}
  requestList: AngularFireList<any>;

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    fullname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    address: new FormControl('', Validators.required),
    // requestDate: new FormControl(''),
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
      // requestDate: '',
      mobile: '',
      requestType: '1',
      imageUrl: '',
      requestDetail: '',
    });
  }
  //Get Method
  getAllRequests() {
    this.requestList = this.firebase.list('request');

    return this.requestList.snapshotChanges();
  }
  //Add Method
  submitRequest(request) {
    this.requestList = this.firebase.list('request');
    this.requestList.push({
      fullname: request.fullname,
      email: request.email,
      address: request.address,
      // requestDate: request.requestDate,
      mobile: request.mobile,
      requestType: request.requestType,
      imageUrl: request.imageUrl,
      requestDetail: request.requestDetail,
    });
  }

  //Update Method
  updateRequest(request) {
    this.requestList.update(request.$key, {
      fullname: request.fullname,
      email: request.email,
      address: request.address,
      // requestDate: request.requestDate,
      mobile: request.mobile,
      requestType: request.requestType,
      imageUrl: request.imageUrl,
      requestDetail: request.requestDetail,
    });
  }
  //Delete Method
  deleteRequestData($key: string) {
    this.requestList.remove($key);
  }
  // Edit Form Data
  editForm(request) {
    this.form.setValue(_.omit(request));
  }
}
