import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent, DialogData } from '../theme/components/dialog/dialog.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  public constructor(private dialog: MatDialog) {}

  openInfoDialog(config: DialogData): Observable<boolean> {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: config
    });
    return dialogRef.afterClosed();
  }
}