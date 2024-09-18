import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { NgForOf, CommonModule } from '@angular/common';
import { MatCheckbox } from '@angular/material/checkbox';
import { ReactiveFormsModule, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { DeviceService } from '../../../core/services/device.service';

@Component({
  selector: 'app-filter-form',
  standalone: true,
  imports: [
    NgForOf,
    CommonModule,
    MatCheckbox,
    ReactiveFormsModule,
  ],
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.scss']
})
export class FilterFormComponent implements OnInit {
  @Output() formSubmit = new EventEmitter<any>();
  form!: FormGroup;
  isMobile: boolean = false;

  mealTypeLabels = ['Breakfast', 'Dinner', 'Teatime'];
  preferenceLabels = ['Vegetarian', 'Vegan', 'Gluten-free'];
  
  constructor(
    private deviceService: DeviceService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.deviceService.isMobile().subscribe(isMobile => {
      this.isMobile = isMobile;
    });

    this.initizeForm();
  }

  initizeForm(): void {
    this.form = this.formBuilder.group({
      mealType: this.formBuilder.array(this.mealTypeLabels.map(() => this.formBuilder.control(false))),
      preference: this.formBuilder.array(this.preferenceLabels.map(() => this.formBuilder.control(false)))
    });
  }

  get mealTypeArray(): FormArray {
    return this.form.get('mealType') as FormArray;
  }

  get preferenceArray(): FormArray {
    return this.form.get('preference') as FormArray;
  }

  onSubmit(): void {
    const selectedMealType = this.form.value.mealType
    .map((checked: boolean, index: number) => checked ? this.mealTypeLabels[index] : null)
    .filter((value: string | null) => value !== null);

    const selectedPreference = this.form.value.preference
    .map((checked: boolean, index: number) => checked ? this.preferenceLabels[index] : null)
    .filter((value: string | null) => value !== null)
    .map((value: string) => value.toLowerCase());
    
    const result = { mealType: selectedMealType, preference: selectedPreference };
    this.formSubmit.emit(result);
  }

}
