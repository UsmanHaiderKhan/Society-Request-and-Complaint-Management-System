import { Component, OnInit } from '@angular/core';
import { ComplainService } from '../../shared/services/complain.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { NotificationService } from '../../shared/services/notification.service';
import { MatDialogRef } from '@angular/material/dialog';
import { OperationService } from '../../shared/services/operation.service';

@Component({
  selector: 'app-complain',
  templateUrl: './complain.component.html',
  styleUrls: ['./complain.component.scss'],
})
export class ComplainComponent implements OnInit {
  optionsSelect: Array<any>;
  selectedImage: any = null;
  imgSrc = '../../../../assets/images/avatar.png';
  constructor(
    public complainService: ComplainService,
    public notificationService: NotificationService,
    private storage: AngularFireStorage,
    private dialog: MatDialogRef<ComplainService>
  ) {}

  ngOnInit() {
    this.optionsSelect = [
      { value: '1', label: 'Normal' },
      { value: '2', label: 'Severe' },
      { value: '3', label: 'Urgent' },
    ];
  }

  submitComplain(formValue) {
    if (this.complainService.form.valid) {
      if (!this.complainService.form.get('$key').value) {
        var filePath = `images/complain/${this.selectedImage.name
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
                this.complainService.submitComplain(formValue);
                this.imgSrc = '../../../../assets/images/avatar.png';
                this.clearForm();
              });
            })
          )
          .subscribe();
      } else {
        this.complainService.updateComplain(formValue);
        this.dialog.close();
      }
    }
  }

  get formControls() {
    return this.complainService.form['controls'];
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
    this.complainService.form.reset();
    this.complainService.onInitialLizeFormGroup();

    this.notificationService.openSnackBar('Submitted SuccessFully');
  }
}
