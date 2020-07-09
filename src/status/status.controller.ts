import { Controller, Get, Param, Query } from '@nestjs/common';
import { StatusService } from './status.service';
import StatusDTO from './status.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('status')
@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get('/pais')
  async getPais(
    @Query('desde') desde: string,
    @Query('hasta') hasta: string,
  ): Promise<StatusDTO[]> {
    return this.statusService.getPais({ desde, hasta });
  }

  @Get('/provincias')
  async getProvinciasAll(
    @Query('desde') desde: string,
    @Query('hasta') hasta: string,
  ): Promise<StatusDTO[]> {
    return this.statusService.getProvinciasAll({ desde, hasta });
  }

  @Get('/provincias/:id')
  async getProvinciasById(
    @Param('id') id: string,
    @Query('desde') desde: string,
    @Query('hasta') hasta: string,
  ): Promise<StatusDTO[]> {
    return this.statusService.getProvinciasById(id, { desde, hasta });
  }
}
