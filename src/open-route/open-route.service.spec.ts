import { Test, TestingModule } from '@nestjs/testing';
import { OpenRouteService } from './open-route.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { of } from 'rxjs';

describe('OpenRouteService', () => {
  let service: OpenRouteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        OpenRouteService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockImplementation((key: string) => {
              if (key === 'OPEN_ROUTE_API_KEY') return 'test-api-key';
              if (key === 'OPEN_ROUTE_API_URL') return 'test-api-url';
            }),
          },
        },
        {
          provide: HttpService,
          useValue: {
            get: jest.fn().mockReturnValue(of({ data: {} })),
          },
        },
      ],
    }).compile();

    service = module.get<OpenRouteService>(OpenRouteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
