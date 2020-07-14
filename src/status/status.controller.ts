import { Controller, Get, Param, Query } from '@nestjs/common';
import { StatusService } from './status.service';
import StatusDTO from './status.dto';
import { ApiTags, ApiQuery, ApiParam, ApiOperation } from '@nestjs/swagger';
import { ProvinciaCodigo } from 'src/shared/enums';

@ApiTags('status')
@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @ApiOperation({
    summary: 'Obtener las actualizaciones del país',
    description:
      'Retorna las actualizaciones registradas para el país, permitiendo filtrar por fechas',
  })
  @ApiQuery({ name: 'desde', required: false, example: '2020-04-01' })
  @ApiQuery({ name: 'hasta', required: false, example: '2020-07-09' })
  @Get('/pais')
  async getPais(
    @Query('desde') desde?: string,
    @Query('hasta') hasta?: string,
  ): Promise<StatusDTO[]> {
    return this.statusService.getPais({ desde, hasta });
  }

  @ApiOperation({
    summary: 'Obtener las actualizaciones de todas las provincias',
    description:
      'Retorna las actualizaciones registradas para todas las provincias, permitiendo filtrar por fechas',
  })
  @ApiQuery({ name: 'desde', required: false, example: '2020-04-01' })
  @ApiQuery({ name: 'hasta', required: false, example: '2020-07-09' })
  @Get('/provincias')
  async getProvinciasAll(
    @Query('desde') desde?: string,
    @Query('hasta') hasta?: string,
  ): Promise<StatusDTO[]> {
    return this.statusService.getProvinciasAll({ desde, hasta });
  }

  @ApiOperation({
    summary: 'Obtener las actualizaciones de la provincia',
    description:
      'Retorna las actualizaciones registradas para la provincia, permitiendo filtrar por fechas',
  })
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
  @ApiOperation({
    summary: 'Obtener última actualización del país',
    description: 'Retorna la ultima actualización registrada para el país',
  })
  @Get('/latest/pais')
  async getLatestPais(): Promise<StatusDTO> {
    return this.statusService.getLatestPais();
  }

  // @Get('/latest/provincias')
  // async getLatestProvinciasAll(): Promise<StatusDTO[]> {
  //   return this.statusService.getLatestProvinciasAll();
  // }

  @ApiOperation({
    summary: 'Obtener última actualización de la provincia',
    description: 'Retorna la ultima actualización registrada para la provincia',
  })
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
