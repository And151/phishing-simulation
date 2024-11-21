import {Injectable} from '@nestjs/common';

@Injectable()
export class PhishingManagementService {
  getHello(): string {
    return 'Hello World!';
  }
}
