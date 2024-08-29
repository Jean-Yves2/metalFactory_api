import { Test, TestingModule } from '@nestjs/testing';
import { AddressModule } from './address.module';

describe('AddressModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [AddressModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });
});
