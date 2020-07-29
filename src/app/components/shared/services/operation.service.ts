import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class OperationService {
  constructor(public fireService: AngularFirestore) {}

  //Add Method
  submitRequest(Request) {
    return this.fireService.collection('request').add(Request);
  }
  //Get Method
  getAllRequests(): Observable<any> {
    return this.fireService.collection('request').snapshotChanges();
  } //Update Method
  updateRequestData(recordRequestId, requests) {
    return this.fireService.doc('request/' + recordRequestId).update(requests);
  }
  //Delete Method
  deleteRequestData(requestId) {
    return this.fireService.doc('request/' + requestId).delete();
  }
}
