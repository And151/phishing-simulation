import { Post, Body, Get, Param, Controller } from '@nestjs/common';
import { SimulationService } from './simulation.service';
import { SimulateDto } from './dto/simulateDto';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UseGuards } from '@nestjs/common';

@Controller('phishing')
export class SimulationController {
  constructor(private readonly simulationService: SimulationService) {}

  @UseGuards(JwtAuthGuard)
  @Post('send')
  create(@Body() createSimulationDto: SimulateDto) {
    return this.simulationService.simulate(createSimulationDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  getAll() {
    return this.simulationService.getAll();
  }

  @Get(':id')
  async handlePhishingUrlClick(@Param() params: Record<string, string>) {
    return await this.simulationService.handlePhishingUrlClick(params.id);
  }
}
