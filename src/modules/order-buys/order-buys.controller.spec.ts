import { Test, TestingModule } from '@nestjs/testing';
import { OrderBuysController } from './order-buys.controller';
import { OrderBuysService } from './order-buys.service';

describe('OrderBuysController', () => {
  let controller: OrderBuysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderBuysController],
      providers: [OrderBuysService],
    }).compile();

    controller = module.get<OrderBuysController>(OrderBuysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
