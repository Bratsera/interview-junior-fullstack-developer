import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent {
  constructor(private cityService: CityService){}
  @ViewChild('searchForm') searchForm!: NgForm;

  onSubmit() {
    this.cityService.searchStringSub.next(this.searchForm.value['city-input']);
    this.searchForm.reset('city-input');
  } 
}
