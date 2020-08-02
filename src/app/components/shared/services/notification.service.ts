import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  durationInSeconds = 5;
  constructor(public snackbar: MatSnackBar) {}
  config: MatSnackBarConfig = {
    // duration: 3000,
    verticalPosition: 'top',
    horizontalPosition: 'right',
  };
  openSnackBar(msg) {
    this.config['pannelClass'] = ['notification', 'success'];
    this.config.duration = 3000;
    this.snackbar.open(msg, '', this.config);
  }
  danger(msg) {
    this.config['pannelClass'] = ['notification', 'warn'];
    // this.config.duration = 3000;
    this.snackbar.open(msg, '', this.config);
  }
}
