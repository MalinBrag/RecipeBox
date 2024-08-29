import { Component, ViewChild, Optional, AfterViewInit, QueryList, ViewChildren } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-filter-form',
  standalone: true,
  imports: [
    MatCheckbox,
  ],
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.scss']
})
export class FilterFormComponent implements AfterViewInit {

  @ViewChildren(MatCheckbox) checkboxes!: QueryList<MatCheckbox>;

  mealTypes: MatCheckbox[] = [];
  preferences: MatCheckbox[] = [];
  
  constructor(@Optional() public dialogRef: MatDialogRef<FilterFormComponent>) {}

  ngAfterViewInit(): void {
    this.categorizeCheckboxes();
  }

  categorizeCheckboxes(): void {
    this.checkboxes.forEach(checkbox => {
      if (checkbox.name === 'mealType') {
        this.mealTypes.push(checkbox);
      } else if (checkbox.name === 'preferences') {
        this.preferences.push(checkbox);
      }
    });
  }

  applyFilter(event: Event): void {
    const selectedMealTypes = this.getValues(this.mealTypes);
    const selectedPreferences = this.getValues(this.preferences);
    console.log(selectedMealTypes, selectedPreferences);

    this.dialogRef.close({
      selectedMealTypes,
      selectedPreferences
    });
  }

  getValues(checkboxes: MatCheckbox[]): string[] {
    return checkboxes
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
