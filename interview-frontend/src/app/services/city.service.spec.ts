import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { CityService } from './city.service';

describe('CityService', () => {
  let service: CityService;
  let httpMock: HttpTestingController;
  const cityMock = [
    { uuid: 'id1', cityName: 'Berlin', count: 754 },
    { uuid: 'id2', cityName: 'Berg', count: 500 },
  ];
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CityService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store the new searchstring ', () => {
    expect(service.curString).toEqual('');
    service.searchStringSub.next('test');
    expect(service.curString).toEqual('test');
  });

  it('Request should have the correct params', () => {
    service.searchStringSub.next('test');
    service.getCities().subscribe();

    httpMock.expectOne({
      method: 'GET',
      url: 'http://localhost:3000/cities?cities=test',
    });
  });

  it('should GET and return a list', () => {
    service.getCities().subscribe({
      next: (cityList) => {
        expect(cityList.length).toEqual(2);
        expect(cityList[1].cityName).toEqual('Berg');
      },
    });

    httpMock
      .expectOne({
        method: 'GET',
        url: 'http://localhost:3000/cities?cities=',
      })
      .flush(cityMock);
  });
});
