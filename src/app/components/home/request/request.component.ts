import { Component, OnInit } from '@angular/core';
import { OperationService } from '../../shared/services/operation.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { NotificationService } from '../../shared/services/notification.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
})
export class RequestComponent implements OnInit {
  optionsSelect: Array<any>;
  selectedImage: any = null;
  imageUrl = '../../../../assets/images/avatar.png';
  constructor(
    public operationService: OperationService,
    public notificationService: NotificationService,
    private storage: AngularFireStorage
  ) {}

  ngOnInit() {
    this.optionsSelect = [
      { value: 'Normal', label: 'Normal' },
      { value: 'Severe', label: 'Severe' },
      { value: 'Urgent', label: 'Urgent' },
    ];
  }
  submitRequest() {
    if (this.operationService.form.valid) {
      if (!this.operationService.form.get('$key').value)
        this.operationService.submitRequest(this.operationService.form.value);
      else {
        this.operationService.updateRequest(this.operationService.form.value);
      }
      this.operationService.form.reset();
      this.operationService.onInitialLizeFormGroup();
      this.notificationService.openSnackBar('Submitted SuccessFully');
      this.onClose();
    }
  }
  onClose() {}
  showImagePreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imageUrl = e.target.result);
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.imageUrl = '../../../../assets/images/avatar.png';
      this.selectedImage = null;
    }
  }
}
