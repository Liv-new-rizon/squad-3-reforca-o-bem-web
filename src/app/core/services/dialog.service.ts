import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../theme/components/dialog/dialog.component';
import { IDialogData } from '../models/interfaces/IDialogData';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  public constructor(private dialog: MatDialog) {}

  openInfoDialog(config: IDialogData): Observable<boolean> {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: config,
    });
    return dialogRef.afterClosed();
  }
}