import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('Controller test', () => {
    it('should return one entry', () => {
      expect(appController.getCities('München').length).toEqual(1);
    });

    it('should support written out umlauts', () => {
      expect(appController.getCities('Muenchen').length).toEqual(1);
    });

    it('should return NotFound Exception', () => {
      try {
        appController.getCities('sdfgdfsgsdf');
      } catch (error) {
        expect(error.toString()).toContain(
          'HttpException: No cities matching the given name.',
        );
      }
    });
  });
});
