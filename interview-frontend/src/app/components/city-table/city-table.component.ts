import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { City } from '../../models/City';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CityService } from 'src/app/services/city.service';

enum ViewState {
  Initial,
  ShowTable,
  EmptyTable,
  Error
}


@Component({
  selector: 'app-city-table',
  templateUrl: './city-table.component.html',
  styleUrls: ['./city-table.component.scss']
})
export class CityTableComponent implements AfterViewInit{
  constructor(private _liveAnnouncer: LiveAnnouncer,
    private cityService: CityService){}
  
  cityColumns: string[] = ['index', 'cityName'];
  cityTable!: MatTableDataSource<any>
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  ViewState = ViewState;
  viewState:ViewState = ViewState.Initial;


  loadCities(){
    this.cityService.searchStringSub.subscribe( () => {
      this.cityService.getCities().subscribe({
        next: (res: City[]) => {
          if(!this.cityTable){}
          this.cityTable= new MatTableDataSource(res);
          this.cityTable.paginator = this.paginator;
          this.cityTable.sort = this.sort;
          this.viewState = ViewState.ShowTable;
        },
        error: (error) => {
          if (error.status == '404')
            this.viewState = ViewState.EmptyTable;
  
          else
            this.viewState = ViewState.Error;
        }
      });
    })
   
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

 ngAfterViewInit(): void {
    this.loadCities();
 }

}
