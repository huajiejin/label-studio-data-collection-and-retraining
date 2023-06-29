import { Test, TestingModule } from '@nestjs/testing';
import { ProjectService } from './project.service';
import { HttpModule } from '@nestjs/axios';
import { Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

describe('ProjectService', () => {
  let service: ProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forRoot()],
      providers: [Logger, ProjectService],
    }).compile();

    service = module.get<ProjectService>(ProjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
