import { Test, TestingModule } from '@nestjs/testing';
import { ProjectController } from './project.controller';
import { HttpModule } from '@nestjs/axios';
import { ProjectService } from './project.service';
import { Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

describe('ProjectController', () => {
  let controller: ProjectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forRoot()],
      controllers: [ProjectController],
      providers: [Logger, ProjectService],
    }).compile();

    controller = module.get<ProjectController>(ProjectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
