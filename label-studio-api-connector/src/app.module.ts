import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health/health.controller';
import { ProjectController } from './project/project.controller';
import { HttpModule } from '@nestjs/axios';
import { ProjectService } from './project/project.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({ envFilePath: '../.env.development.local' }),
  ],
  controllers: [AppController, HealthController, ProjectController],
  providers: [Logger, AppService, ProjectService],
})
export class AppModule {}
