import { Controller, Get, Param, Query } from '@nestjs/common';
import { StatusService } from './status.service';
import StatusDTO from './status.dto';
import { StatusParams } from './status.interfaces';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get('/pais')
  async getPais(@Query() params: Partial<StatusParams>): Promise<StatusDTO[]> {
    return this.statusService.getPais(params);
  }

  @Get('/provincias')
  async getProvinciasAll(
    @Query() params: Partial<StatusParams>,
  ): Promise<StatusDTO[]> {
    return this.statusService.getProvinciasAll(params);
  }

  @Get('/provincias/:id')
  async getProvinciasById(
    @Param('id') id: string,
    @Query() params: Partial<StatusParams>,
  ): Promise<StatusDTO[]> {
    return this.statusService.getProvinciasById(id, params);
  }

  // @Get('/:id')
  // async getOne(
  //   @Param('id') id,
  //   @Query() params: Partial<StatusParams>,
  // ): Promise<StatusDTO[]> {
  //   // destroy params provincia
  //   delete params.provincia;

  //   return this.statusService.getStatuses({ id, ...params });
  // }
}
