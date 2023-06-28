import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
	/**
	 * Health Check Endpoint
	 * 
	 * @returns {{ status: 'ok' }} - The health status of the API.
	 */
	@Get()
	checkHealth() {
	  return { status: 'ok' };
	}
}
