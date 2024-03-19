import { Controller, Post } from '@nestjs/common';
import { FakerService } from './faker.service';

@Controller('faker')
export class FakerController {
  constructor(private readonly fakerService: FakerService) {}

  @Post('generate-user')
  async generateFakeUser(): Promise<string> {
    await this.fakerService.generateFakeUser();
    return 'Fake user generated successfully.';
  }
}
