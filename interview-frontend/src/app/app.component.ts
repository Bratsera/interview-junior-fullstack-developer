import { Component } from '@angular/core';
import { CityService } from './services/city.service';
import { City } from './models/City';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'interview-frontend';
}
