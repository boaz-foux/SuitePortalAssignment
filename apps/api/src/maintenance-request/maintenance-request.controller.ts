import { BadRequestException, Body, Controller, Post, Get, Param, Put, UseGuards } from '@nestjs/common';
import { MaintenanceRequestService } from './maintenance-request.service';
import { maintenanceRequestDto } from './maintenance-request.dto';
import { LoginGuard } from '../login/login.guard';

@Controller('maintenance-requests')
export class MaintenanceRequestController {

  constructor(
    private readonly maintenanceRequestService: MaintenanceRequestService,
  ) {
    //
  }

  @Post('/')
  public async createMaintenanceRequest(
    @Body() maintenanceRequest: maintenanceRequestDto,
  ) {
    return await this.maintenanceRequestService.createMaintenanceRequest(maintenanceRequest);
  }

  @Get('/:id')
  public async getMaintenanceRequest(
    @Param('id') id: string,
  ) {
    if (!id) {
      throw new BadRequestException('No id provided');
    }
    return await this.maintenanceRequestService.getMaintenanceRequest(id);
  }

  @UseGuards(LoginGuard)
  @Get('/')
  public async getOpenMaintenanceRequests() {
    return await this.maintenanceRequestService.getOpenMaintenanceRequests();
  }

  @UseGuards(LoginGuard)
  @Put('/:id/close')
  public async closeMaintenanceRequest(
    @Param('id') id: string,
  ) {
    return await this.maintenanceRequestService.closeMaintenanceRequest(id);
  }

}
