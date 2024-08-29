import { MongooseModule } from '@nestjs/mongoose';

jest.mock('@nestjs/mongoose', () => {
  const originalModule = jest.requireActual('@nestjs/mongoose');
  return {
    ...originalModule,
    MongooseModule: {
      forRoot: jest.fn().mockReturnValue({
        module: class DummyModule {},
        providers: [],
      }),
      forFeature: jest.fn().mockReturnValue({
        module: class DummyModule {},
        providers: [],
      }),
    },
  };
});

export const mockMongoose = MongooseModule;
