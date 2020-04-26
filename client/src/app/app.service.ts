import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SnackbarComponent } from './shared/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private snackBar: MatSnackBar) { }

  showToast(message: string, isError: boolean) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 5 * 1000,
      data: message
    });
  }

}
