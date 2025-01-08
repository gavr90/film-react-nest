import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: FilmsService;
  const filmsServiceMock = {
    find: jest
      .fn()
      .mockResolvedValue([{ id: 'test_id_1' }, { id: 'test_id_2' }]),
    findOne: jest.fn().mockResolvedValue([{ id: 'test_id' }]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [FilmsService],
    })
      .overrideProvider(FilmsService)
      .useValue(filmsServiceMock)
      .compile();

    controller = module.get<FilmsController>(FilmsController);
    service = module.get<FilmsService>(FilmsService);
  });

  it('should call FilmsService.find()', async () => {
    const films = await controller.find();
    expect(films).toEqual([{ id: 'test_id_1' }, { id: 'test_id_2' }]);
    expect(service.find).toHaveBeenCalled();
  });

  it('should call FilmsService.findOne with test_id', async () => {
    const film = await controller.findOne('test_id');
    expect(film).toEqual([{ id: 'test_id' }]);
    expect(service.find).toHaveBeenCalledWith('test_id');
  });
});
