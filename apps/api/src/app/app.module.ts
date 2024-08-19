import { Module } from '@nestjs/common';
import { MaintenanceRequestModule } from '../maintenance-request/maintenance-request.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from '../login/login.module';

@Module({
  imports: [
    MaintenanceRequestModule,
    LoginModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
