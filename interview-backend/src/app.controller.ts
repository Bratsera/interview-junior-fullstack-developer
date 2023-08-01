import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { City } from './models/City';

@Controller('cities')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getCities(@Query('cities') searchString: string): City[] {
    return this.appService.getCities(searchString);
  }
}
