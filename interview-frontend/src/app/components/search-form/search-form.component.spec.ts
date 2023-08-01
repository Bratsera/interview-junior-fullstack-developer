import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { SearchFormComponent } from './search-form.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CityService } from 'src/app/services/city.service';

describe('SearchFormComponent', () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchFormComponent],
      imports: [
        BrowserModule,
        MatIconModule,
        FormsModule,
        MatInputModule,
        MatFormFieldModule,
        HttpClientModule,
        NoopAnimationsModule,
        MatButtonModule,
      ],
    });
    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should type input and submit form', () => {
    const cityService = fixture.debugElement.injector.get(CityService);
    spyOn(cityService.searchStringSub, 'next');
    spyOn(component.searchForm, 'reset');
    const el = fixture.nativeElement as HTMLElement;
    const inputEl = el.querySelector('input');
    const submitBtn = el.querySelector('button');

    expect(inputEl?.value).toBe('');
    if (inputEl) inputEl.value = 'test';
    expect(inputEl?.value).toBe('test');
    submitBtn?.click();

    fixture.detectChanges();
    expect(cityService.searchStringSub.next).toHaveBeenCalled();
    expect(component.searchForm.reset).toHaveBeenCalled();
  });
});
