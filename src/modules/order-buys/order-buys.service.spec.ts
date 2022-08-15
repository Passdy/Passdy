import { Test, TestingModule } from '@nestjs/testing';
import { OrderBuysService } from './order-buys.service';

describe('OrderBuysService', () => {
  let service: OrderBuysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderBuysService],
    }).compile();

    service = module.get<OrderBuysService>(OrderBuysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
