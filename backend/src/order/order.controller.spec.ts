import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;
  const orderServiceMock = {
    create: jest.fn().mockResolvedValue({
      email: 'test@test.ru',
      phone: '71234567890',
      tickets: [
        {
          film: '64145bb0-996a-4644-b351-af6dc1266514',
          session: '373452c8-e4c6-450a-a2ca-30d46a27e81e',
          daytime: '2023-05-29T10:30:00.001Z',
          row: 1,
          seat: 1,
          price: 350,
        },
        {
          film: '64145bb0-996a-4644-b351-af6dc1266514',
          session: '373452c8-e4c6-450a-a2ca-30d46a27e81e',
          daytime: '2023-05-29T10:30:00.001Z',
          row: 1,
          seat: 2,
          price: 350,
        },
      ],
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    })
      .overrideProvider(OrderService)
      .useValue(orderServiceMock)
      .compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  it('should call OrderService.create with test_id', async () => {
    const tickets = [
      {
        film: '64145bb0-996a-4644-b351-af6dc1266514',
        session: '373452c8-e4c6-450a-a2ca-30d46a27e81e',
        daytime: '2023-05-29T10:30:00.001Z',
        row: 1,
        seat: 1,
        price: 350,
      },
      {
        film: '64145bb0-996a-4644-b351-af6dc1266514',
        session: '373452c8-e4c6-450a-a2ca-30d46a27e81e',
        daytime: '2023-05-29T10:30:00.001Z',
        row: 1,
        seat: 2,
        price: 350,
      },
    ];
    const order = await controller.create({
      email: 'test@test.ru',
      phone: '71234567890',
      tickets: tickets,
    });
    expect(order).toEqual({ total: 2, tickets });
    expect(service.create).toHaveBeenCalledWith({
      email: 'test@test.ru',
      phone: '71234567890',
      tickets: tickets,
    });
  });
});
