import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { CityTableComponent } from './components/city-table/city-table.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

describe('AppComponent', () => {
  beforeEach(async () =>
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        AppRoutingModule,
        MatSortModule,
        MatIconModule,
        MatTableModule,
        MatPaginatorModule,
        FormsModule,
        MatInputModule,
        MatFormFieldModule,
        HttpClientModule,
        NoopAnimationsModule,
        MatButtonModule,
        RouterTestingModule,
      ],
      declarations: [AppComponent, SearchFormComponent, CityTableComponent],
    })
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'interview-frontend'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('interview-frontend');
  });

  it('should show header', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.header h1')?.textContent).toContain(
      'City API'
    );
  });
});
