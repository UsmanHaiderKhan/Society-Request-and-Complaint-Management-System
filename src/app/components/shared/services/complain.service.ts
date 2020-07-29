import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ComplainService {
  constructor(public fireService: AngularFirestore) {}
  //Add Method
  submitComplain(Complain) {
    return this.fireService.collection('complain').add(Complain);
  }
  //Get Method
  getAllComplains(): Observable<any> {
    return this.fireService.collection('complain').snapshotChanges();
  } //Update Method
  updateComplainData(recordComplainId, complain) {
    return this.fireService
      .doc('complain/' + recordComplainId)
      .update(complain);
  }
  //Delete Method
  deleteComplainData(complainId) {
    return this.fireService.doc('complain/' + complainId).delete();
  }
}
