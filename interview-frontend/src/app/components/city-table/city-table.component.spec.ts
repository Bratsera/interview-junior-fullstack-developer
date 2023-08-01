import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CityTableComponent } from './city-table.component';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { CityService } from 'src/app/services/city.service';
import { City } from 'src/app/models/City';
import { of, throwError } from 'rxjs';

describe('CityTableComponent', () => {
  let component: CityTableComponent;
  let fixture: ComponentFixture<CityTableComponent>;

  const cityMock: City[] = [
    { uuid: 'id1', cityName: 'Berlin', count: 754 },
    { uuid: 'id2', cityName: 'Berg', count: 500 },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CityTableComponent],
      imports: [
        MatSortModule,
        MatTableModule,
        MatPaginatorModule,
        HttpClientModule,
        NoopAnimationsModule,
      ],
    });
    fixture = TestBed.createComponent(CityTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display default state', () => {
    const viewMessage = fixture.nativeElement as HTMLElement;
    expect(viewMessage.querySelector('.table-view p')?.textContent).toContain(
      'Please enter the city'
    );
  });

  it('should display table', () => {
    const cityService = fixture.debugElement.injector.get(CityService);
    spyOn(cityService, 'getCities').and.returnValue(of(cityMock));

    const tableEl = fixture.nativeElement.querySelector('.table') as Element;
    expect(tableEl).toBeTruthy();
    expect(getComputedStyle(tableEl).display).toEqual('none');

    cityService.searchStringSub.next('test');
    fixture.detectChanges();

    expect(getComputedStyle(tableEl).display).toEqual('block');
    expect(tableEl.getElementsByTagName('tr').length).toEqual(3);
  });

  it('should display 404 response state', () => {
    const cityService = fixture.debugElement.injector.get(CityService);
    spyOn(cityService, 'getCities').and.returnValue(
      throwError(() => new HttpErrorResponse({ status: 404 }))
    );

    const viewMessage = fixture.nativeElement as HTMLElement;
    expect(viewMessage.querySelector('.table-view p')?.textContent).toContain(
      'Please enter the city'
    );

    cityService.searchStringSub.next('test');
    fixture.detectChanges();

    expect(viewMessage.querySelector('.table-view p')?.textContent).toContain(
      'No cities found.'
    );
  });

  it('should display error state', () => {
    const cityService = fixture.debugElement.injector.get(CityService);
    spyOn(cityService, 'getCities').and.returnValue(
      throwError(() => new HttpErrorResponse({ status: 401 }))
    );
    const viewMessage = fixture.nativeElement as HTMLElement;

    expect(viewMessage.querySelector('.table-view p')?.textContent).toContain(
      'Please enter the city'
    );

    cityService.searchStringSub.next('test');
    fixture.detectChanges();

    expect(viewMessage.querySelector('.table-view p')?.textContent).toContain(
      'An unexpected error occured'
    );
  });
});
