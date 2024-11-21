import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('phishing.simulate')
  simulatePhishing(@Payload() data: Record<string, string>) {
    return this.appService.simulatePhishing(data);
  }
}
