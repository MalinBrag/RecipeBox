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

  /**
   * Opens a dialog with the given component and data.
   * @param component - The component to open
   * @param data - The data to pass to the component
   * @returns An observable that emits the result of the dialog
   */
  openDialog(component: any, data?: any): Observable<any> {
    const dialogRef = this.dialog.open(component);
    dialogRef.afterOpened().subscribe(() => {
      if (data?.fields) {
        (dialogRef.componentInstance as any).fields = data.fields;
      }
    });
    
    return dialogRef.afterClosed();
  }

  /**
   * Closes the dialog through a method call (submit button)
   */
  closeDialog(data?: any): void {
    this.dialog.closeAll();
  }

  /**
   * Closes the dialog through a method call (cancel button, X in the corner of the dialog)
   */
  cancelDialog(data?: any): void {
    this.dialog.closeAll();
  }

}
