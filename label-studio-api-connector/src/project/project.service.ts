import { HttpService } from '@nestjs/axios';
import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosRequestConfig } from 'axios';
import { from, map, switchMap, tap } from 'rxjs';
import { CreateProjectDto } from './create-project.dto';
import { promises as fs } from 'fs';

@Injectable()
export class ProjectService implements OnApplicationBootstrap {
	private readonly logger = new Logger(ProjectService.name);
	private labelStudioRequestConfig: AxiosRequestConfig;
	private labelStudioTasksReadingPath: string;
	private labelStudioTasksSavingPath: string;

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

		const LS_BASE_DATA_DIR = this.configService.get<string>('LS_BASE_DATA_DIR', '/label-studio/data');
		this.labelStudioTasksReadingPath = `${LS_BASE_DATA_DIR}/label-studio-tasks`;

		const LSDCAR_BASE_DATA_DIR = this.configService.get<string>('LSDCAR_BASE_DATA_DIR');
		this.labelStudioTasksSavingPath = `${LSDCAR_BASE_DATA_DIR}/label-studio-tasks`;
	}
	
	createProject(dto: CreateProjectDto) {
		return this.httpService
			.post<LabelStudioCreateProjectResponse>('/api/projects', dto, this.labelStudioRequestConfig)
			.pipe(
				map(res => res.data),
				tap({
					next: value => this.logger.debug(`createProject ${JSON.stringify(value)}`),
					error: err => this.logger.error(`Error createProject`, err),
				}),
			);
	}

	createLocalfilesStorage(projectID: number) {
		const readingPath = `${this.labelStudioTasksReadingPath}/${projectID}`;
		const savingPath = `${this.labelStudioTasksSavingPath}/${projectID}`;
		const payload = {
			project: projectID,
			title: `Localfiles Storage for Tasks of Project ${projectID}`,
			path: readingPath,
			regex_filter: '.*json',
		};
		return from(this.createFolder(savingPath))
			.pipe(
				tap({
					next: value => this.logger.debug(`createFolder ${value}`),
					error: err => this.logger.error(`Error createFolder`, err),
				}),
				switchMap(() => this.httpService.post<LabelStudioCreateLocalfilesStorageResponse>('/api/storages/localfiles', payload, this.labelStudioRequestConfig)),
				map(resp => resp.data),
				tap({
					next: value => this.logger.debug(`post /api/storages/localfiles ${JSON.stringify(value)}`),
					error: err => this.logger.error(`Error post /api/storages/localfiles ${JSON.stringify(payload)}`, err),
				}),
			);
	}

	createSampleProject(dto: CreateProjectDto) {
		return this.createProject(dto)
			.pipe(
				switchMap(resp => this.createLocalfilesStorage(resp.id)),
			);
	}

	async onApplicationBootstrap() {
		// await this.createFolder(this.labelStudioTasksPath);
	}

	async createFolder(path: string) {
		await fs.mkdir(path, { recursive: true })
			.then(() => {
				this.logger.log(`Folder created ${path}`);
			})
			.catch((err) => {
				this.logger.error(`Error creating folder ${path}`, err);
			});
	}
}

export interface LabelStudioCreateProjectResponse {
	id: number
	title: string
}

export interface LabelStudioCreateLocalfilesStorageResponse {
	id: number
	project: number
	title: string
	type: string
	path: string
	regex_filter: string
}
