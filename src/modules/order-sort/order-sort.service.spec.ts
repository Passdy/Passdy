import { Test, TestingModule } from '@nestjs/testing';
import { OrderSortService } from './order-sort.service';

describe('OrderSortService', () => {
  let service: OrderSortService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderSortService],
    }).compile();

    service = module.get<OrderSortService>(OrderSortService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
