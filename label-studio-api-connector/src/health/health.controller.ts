import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('health')
@Controller('health')
export class HealthController {
	@Get()
	@ApiOperation({ summary: 'Health check endpoint' })
	@ApiOkResponse({ description: 'The health status of the API. 1 means ok.', type: Number })
	checkHealth() {
		return 1
	}
}
