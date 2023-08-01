import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { City } from '../models/City';
import { Observable, Subject } from 'rxjs';

const backendUrl = 'http://localhost:3000/cities';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  searchStringSub: Subject<string> = new Subject();
  curString: string = '';

  constructor(private http: HttpClient) {
    this.searchStringSub.subscribe((newstring) => {
      this.curString = newstring ? newstring : '';
    });
  }

  getCities(): Observable<City[]> {
    let queryParams = new HttpParams().append('cities', this.curString);
    return this.http.get<City[]>(backendUrl, { params: queryParams });
  }
}
