import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root',
})
export class ComplainService {
  constructor(public firebase: AngularFireDatabase) {}
  complainList: AngularFireList<any>;

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    fullname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    address: new FormControl('', Validators.required),
    mobile: new FormControl('', [Validators.required]),
    complainType: new FormControl(1),
    imageUrl: new FormControl(''),
    complainDetail: new FormControl(''),
  });
  // Initialize
  onInitialLizeFormGroup() {
    this.form.setValue({
      $key: null,
      fullname: '',
      email: '',
      address: '',
      mobile: '',
      complainType: '1',
      imageUrl: '',
      complainDetail: '',
    });
  }
  //Get Method
  getAllComplains() {
    this.complainList = this.firebase.list('complain');
    return this.complainList.snapshotChanges();
  }
  //Add Method
  submitComplain(complain) {
    this.complainList = this.firebase.list('complain');
    this.complainList.push({
      fullname: complain.fullname,
      email: complain.email,
      address: complain.address,
      mobile: complain.mobile,
      complainType: complain.complainType,
      imageUrl: complain.imageUrl,
      complainDetail: complain.complainDetail,
    });
  }
  //Update Method
  updateComplain(complain) {
    this.complainList.update(complain.$key, {
      fullname: complain.fullname,
      email: complain.email,
      address: complain.address,
      mobile: complain.mobile,
      complainType: complain.complainType,
      imageUrl: complain.imageUrl,
      complainDetail: complain.complainDetail,
    });
  }
  //Delete Method
  deleteComplainData($key: string) {
    this.complainList.remove($key);
  }
  //
  complainEditForm(complain) {
    this.form.setValue(_.omit(complain));
  }
}
