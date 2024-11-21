import { Module } from '@nestjs/common';
import { SimulationService } from './simulation.service';
import { SimulationController } from './simulation.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Attempts,
  AttemptsSchema,
} from '../../../../common/schemas/attempts.schema';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SIMULATION_CLIENT',
        transport: Transport.TCP,
        options: {
          host: '0.0.0.0',
          port: 3001,
        },
      },
    ]),
    MongooseModule.forFeature([
      { name: Attempts.name, schema: AttemptsSchema },
    ]),
  ],
  controllers: [SimulationController],
  providers: [SimulationService],
})
export class SimulationModule {}
