import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private dialog: MatDialog,
  ) { }

  openDialog(component: any, data?: any): Observable<any> {
    const dialogRef = this.dialog.open(component);
    dialogRef.afterOpened().subscribe(() => {
      if (data?.fields) {
        (dialogRef.componentInstance as any).fields = data.fields;
      }
    });
    return dialogRef.afterClosed();
  }

  closeDialog(data?: any): void {
    this.dialog.closeAll();
  }

  cancelDialog(data?: any): void {
    this.dialog.closeAll();
  }

}
