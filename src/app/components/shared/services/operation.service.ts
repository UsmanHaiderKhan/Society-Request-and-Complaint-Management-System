import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class OperationService {
  requetList: AngularFireList<any>;

  constructor(public firebase: AngularFireDatabase) {}

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    fullname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    address: new FormControl(''),
    mobile: new FormControl('', [
      Validators.required,
      Validators.minLength(11),
    ]),
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

  //Add Method
  submitRequest(Request) {
    this.requetList.push({
      fullname: Request.fullname,
      email: Request.email,
      address: Request.address,
      mobile: Request.mobile,
      requestType: Request.gender,
      imageUrl: Request.imageUrl,
      requestDetail: Request.requestDetail,
    });
  }
  //Get Method
  getAllRequests(): Observable<any> {
    this.requetList = this.firebase.list('request');
    return this.requetList.snapshotChanges();
  } //Update Method
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
}
