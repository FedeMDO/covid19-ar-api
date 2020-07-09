import { Controller, Get, Param, Query } from '@nestjs/common';
import { StatusService } from './status.service';
import StatusDTO from './status.dto';
import { ApiTags, ApiQuery, ApiParam } from '@nestjs/swagger';
import { ProvinciaCodigo } from 'src/shared/enums';

@ApiTags('status')
@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @ApiQuery({ name: 'desde', required: false, example: '2020-04-01' })
  @ApiQuery({ name: 'hasta', required: false, example: '2020-07-09' })
  @Get('/pais')
  async getPais(
    @Query('desde') desde?: string,
    @Query('hasta') hasta?: string,
  ): Promise<StatusDTO[]> {
    return this.statusService.getPais({ desde, hasta });
  }

  @ApiQuery({ name: 'desde', required: false, example: '2020-04-01' })
  @ApiQuery({ name: 'hasta', required: false, example: '2020-07-09' })
  @Get('/provincias')
  async getProvinciasAll(
    @Query('desde') desde?: string,
    @Query('hasta') hasta?: string,
  ): Promise<StatusDTO[]> {
    return this.statusService.getProvinciasAll({ desde, hasta });
  }

  @ApiParam({
    name: 'id',
    description: 'Código oficial de la provincia. Ej. Buenos Aires 06',
    example: '06',
    enum: ProvinciaCodigo,
  })
  @ApiQuery({ name: 'desde', required: false, example: '2020-04-01' })
  @ApiQuery({ name: 'hasta', required: false, example: '2020-07-09' })
  @Get('/provincias/:id')
  async getProvinciasById(
    @Param('id') id: string,
    @Query('desde') desde?: string,
    @Query('hasta') hasta?: string,
  ): Promise<StatusDTO[]> {
    return this.statusService.getProvinciasById(id, { desde, hasta });
  }

  // latest
  @Get('/latest/pais')
  /**
   * Devuelve el ultimo objeto registrado para el pais
   */
  async getLatestPais(): Promise<StatusDTO> {
    return this.statusService.getLatestPais();
  }

  // @Get('/latest/provincias')
  // async getLatestProvinciasAll(): Promise<StatusDTO[]> {
  //   return this.statusService.getLatestProvinciasAll();
  // }

  @ApiParam({
    name: 'id',
    description: 'Código oficial de la provincia. Ej. Buenos Aires: 06',
    example: '06',
    enum: ProvinciaCodigo,
  })
  @Get('/latest/provincias/:id')
  async getLatestProvinciasById(@Param('id') id: string): Promise<StatusDTO> {
    return this.statusService.getLatestProvinciasById(id);
  }
}
