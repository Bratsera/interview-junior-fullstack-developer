import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { City } from './models/City';
import * as cities from './cities.json';

@Injectable()
export class AppService {

  format(string: string) {
    return string
      .toUpperCase()
      .replace(/\u00dc/g, 'UE')
      .replace(/\u00c4/g, 'AE')
      .replace(/\u00d6/g, 'OE')
      .replace(/\u00df/g, 'SS');
  }

  getCities(searchString: string): City[] {
    const filteredCities = cities.filter((city) =>
      this.format(city.cityName).startsWith(this.format(searchString)),
    );

    if (filteredCities.length > 0) 
      return filteredCities;
    else
      throw new HttpException(
        'No cities matching the given name.',
        HttpStatus.NOT_FOUND,
      );
  }
}
