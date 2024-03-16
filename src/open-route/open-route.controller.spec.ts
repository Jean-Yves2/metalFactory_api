import { Test, TestingModule } from '@nestjs/testing';
import { OpenRouteController } from './open-route.controller';

describe('OpenRouteController', () => {
  let controller: OpenRouteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpenRouteController],
    }).compile();

    controller = module.get<OpenRouteController>(OpenRouteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
