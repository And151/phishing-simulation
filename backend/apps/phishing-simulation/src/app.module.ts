import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {appConfig} from '../../phishing-management/src/config';
import {MongooseModule} from '@nestjs/mongoose';
import {Attempts, AttemptsSchema} from '../../common/schemas/attempts.schema';

@Module({
  imports: [
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
    MongooseModule.forFeature([
      {name: Attempts.name, schema: AttemptsSchema},
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
