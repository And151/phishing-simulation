import {Module} from '@nestjs/common';
import {PhishingManagementController} from './phishing-management.controller';
import {PhishingManagementService} from './phishing-management.service';
import {UsersModule} from './modules/users/users.module';
import {MongooseModule} from '@nestjs/mongoose';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {appConfig} from './config';
import {AuthModule} from './modules/auth/auth.module';
import {SimulationModule} from './modules/simulation/simulation.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: ['.env'],
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get('app.databaseUrl'),
      }),
    }),
    SimulationModule,
  ],
  controllers: [PhishingManagementController],
  providers: [PhishingManagementService],
})
export class PhishingManagementModule {
}
