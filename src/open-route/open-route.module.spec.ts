import { Test, TestingModule } from '@nestjs/testing';
import { OpenRouteModule } from './open-route.module';

describe('OpenRouteModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [OpenRouteModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });
});
