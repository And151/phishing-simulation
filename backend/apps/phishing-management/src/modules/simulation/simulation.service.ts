import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SimulateDto } from './dto/simulateDto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Attempts,
  AttemptsDocument,
  AttemptStatus,
} from '../../../../common/schemas/attempts.schema';

@Injectable()
export class SimulationService {
  constructor(
    @Inject('SIMULATION_CLIENT') private simulationClient: ClientProxy,
    @InjectModel(Attempts.name)
    private readonly attemptsModel: Model<AttemptsDocument>,
  ) {}

  simulate(data: SimulateDto) {
    return this.simulationClient.send('phishing.simulate', data);
  }

  async handlePhishingUrlClick(attemptId: string) {
    const attempt = await this.attemptsModel.findOne({ _id: attemptId });
    if (!attempt) {
      throw new HttpException('Attempt not found', 404);
    }
    await this.attemptsModel.updateOne(
      { _id: attempt._id },
      { status: AttemptStatus.OPENED },
    );
    return {
      success: true,
      text: 'Congrats, you are a victim of phishing!!!)))',
    };
  }

  getAll() {
    return this.attemptsModel.find().sort({ createdAt: -1 });
  }
}
