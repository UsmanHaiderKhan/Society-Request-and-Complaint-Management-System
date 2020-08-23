import { Component, OnInit } from '@angular/core';
import { OperationService } from '../../shared/services/operation.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
})
export class RequestComponent implements OnInit {
  optionsSelect: Array<any>;
  selectedImage: any = null;
  imgSrc = '../../../../assets/images/avatar.png';
  constructor(
    public operationService: OperationService,
    public notificationService: NotificationService,
    private storage: AngularFireStorage
  ) {}

  ngOnInit() {
    // this.operationService.getAllRequests();
    this.optionsSelect = [
      { value: '1', label: 'Normal' },
      { value: '2', label: 'Severe' },
      { value: '3', label: 'Urgent' },
    ];
  }

  submitRequest(formValue) {
    if (this.operationService.form.valid) {
      if (!this.operationService.form.get('$key').value) {
        var filePath = `images/request/${this.selectedImage.name
          .split('.')
          .slice(0, -1)
          .join('.')}_${new Date().getTime()}`;
        const fileRef = this.storage.ref(filePath);
        this.storage
          .upload(filePath, this.selectedImage)
          .snapshotChanges()
          .pipe(
            finalize(() => {
              fileRef.getDownloadURL().subscribe((url) => {
                formValue['imageUrl'] = url;
                this.operationService.submitRequest(formValue);
                this.imgSrc = '../../../../assets/images/avatar.png';
                this.clearForm();
              });
            })
          )
          .subscribe();
      } else {
        this.operationService.updateRequest(formValue);
      }
    }
  }

  get formControls() {
    return this.operationService.form['controls'];
  }
  showImagePreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imgSrc = e.target.result);
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.imgSrc = '../../../../assets/images/avatar.png';
      this.selectedImage = null;
    }
  }
  clearForm() {
    this.operationService.form.reset();
    this.operationService.onInitialLizeFormGroup();
    this.notificationService.openSnackBar('Submitted SuccessFully');
  }
}
