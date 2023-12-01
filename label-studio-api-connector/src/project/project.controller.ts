import { Controller, Post, Body, Param } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { lastValueFrom } from 'rxjs';
import { CreateProjectDto } from './create-project.dto';

@ApiTags('project')
@Controller('project')
export class ProjectController {
	constructor(private readonly projectService: ProjectService) {}

	@Post()
	@ApiOperation({ summary: 'Create project on Label Studio' })
	@ApiOkResponse({ description: 'Returns the id of the project.' })
	async createProject(@Body() dto: CreateProjectDto) {
		return await lastValueFrom(this.projectService.createProject(dto));
	}

	@Post('sample')
	@ApiOperation({ summary: 'Create sample project on Label Studio'})
	createSampleProject(@Param('title') title: string) {
		return this.projectService.createSampleProject({ title });
	}
}
