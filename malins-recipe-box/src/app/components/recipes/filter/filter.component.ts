import { Component, OnInit, Renderer2, ElementRef, Output, EventEmitter } from '@angular/core';
import { NgIf } from '@angular/common';
import { DeviceService } from '../../../core/services/device.service';
import { FilterFormComponent } from '../filter-form/filter-form.component';
import { RecipeApiService } from '../../../core/services/api/recipe-api.service';
import { RecipeModel } from '../../../shared/models/recipe.model';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    NgIf,
    FilterFormComponent,
  ],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Output() filterChange = new EventEmitter<{ filters: { mealType: string[], preference: string[] }, filtersChanged: boolean }>();
  filtersChanged = false;

  recipes: RecipeModel[] = [];
  allRecipesLoaded: boolean = false;
  isMobile: boolean = false;
  filters = { mealType: [], preference: [] };

  constructor(
    private deviceService: DeviceService,
    private apiService: RecipeApiService,
    private renderer: Renderer2,
    private elRef: ElementRef,
  ) {}

  /**
   * Initialize the component
   */
  ngOnInit(): void {
    this.deviceService.isMobile().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }

  /**
   * Toggle the visibility of the filter form
   */
  toggleFilterVisibility(): void {
    const filterContainer = this.elRef.nativeElement.querySelector('.filter-container');
    if (filterContainer. classList.contains('filter-form-visible')) {
      this.renderer.removeClass(filterContainer, 'filter-form-visible');
    } else {
      this.renderer.addClass(filterContainer, 'filter-form-visible');
    }
  } 

  /**
   * Apply the filters to the recipes and emit the filter change event
   * @param filters - The selected filters
   */
  applyFilter = (filters: { mealType: string[], preference: string[] }) => {
    this.filtersChanged = true;
    this.filterChange.emit({
      filters,
      filtersChanged: this.filtersChanged,
    });
  }


}
