import {Controller, Get} from '@nestjs/common';
import {PhishingManagementService} from './phishing-management.service';

@Controller()
export class PhishingManagementController {
  constructor(
    private readonly phishingManagementService: PhishingManagementService,
  ) {
  }

  @Get()
  getHello(): string {
    return this.phishingManagementService.getHello();
  }
}
