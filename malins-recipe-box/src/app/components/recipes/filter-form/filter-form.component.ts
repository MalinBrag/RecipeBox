import { Component, Optional, AfterViewInit, QueryList, ViewChildren } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { DialogService } from '../../../core/services/dialog.service';

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
  
  constructor(@Optional() private dialogService: DialogService) {}

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

    this.dialogService.cancelDialog({
      selectedMealTypes,
      selectedPreferences
    });
  }

  getValues(checkboxes: MatCheckbox[]): string[] {
    return checkboxes
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value);
  }

  cancelDialog(): void {
    this.dialogService.cancelDialog();
  }

}
