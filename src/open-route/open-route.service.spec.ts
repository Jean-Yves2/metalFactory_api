import { Test, TestingModule } from '@nestjs/testing';
import { OpenRouteService } from './open-route.service';

describe('OpenRouteService', () => {
  let service: OpenRouteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpenRouteService],
    }).compile();

    service = module.get<OpenRouteService>(OpenRouteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
