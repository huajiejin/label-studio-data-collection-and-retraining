import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosRequestConfig } from 'axios';
import { map } from 'rxjs';
import { CreateProjectDto } from './create-project.dto';

@Injectable()
export class ProjectService {
	private readonly logger = new Logger(ProjectService.name);
	private labelStudioRequestConfig: AxiosRequestConfig

	constructor(
		private readonly httpService: HttpService,
		private readonly configService: ConfigService,
	) {
		const LABEL_STUDIO_BASE_URL = this.configService.get<string>('LABEL_STUDIO_BASE_URL', '');
		const LABEL_STUDIO_USER_TOKEN = this.configService.get<string>('LABEL_STUDIO_USER_TOKEN', '');

		this.labelStudioRequestConfig = {
			baseURL: LABEL_STUDIO_BASE_URL,
			headers: { Authorization: `Token ${LABEL_STUDIO_USER_TOKEN}` },
		};
		this.logger.debug(`labelStudioRequestConfig is ${JSON.stringify(this.labelStudioRequestConfig)}`);
	}
	
	createProject(dto: CreateProjectDto) {
		return this.httpService
			.post<LabelStudioCreateProjectResponse>('/api/projects', dto, this.labelStudioRequestConfig)
			.pipe(map(res => res.data))
	}
}

export interface LabelStudioCreateProjectResponse {
	id: number
	title: string
}
