import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProvinciasService } from './provincias.service';
import ProvinciaDTO from './provincias.dto';
import { ProvinciasParams } from './provincias.interfaces';

@Controller('provincias')
export class ProvinciasController {
  constructor(private readonly provService: ProvinciasService) {}

  @Get()
  async getAll(
    @Query() params: Partial<ProvinciasParams>,
  ): Promise<ProvinciaDTO[]> {
    return this.provService.getProvincias(params);
  }

  @Get('/:id')
  async getOne(
    @Param('id') id,
    @Query() params: Partial<ProvinciasParams>,
  ): Promise<ProvinciaDTO[]> {
    // destroy params provincia
    delete params.provincia;

    return this.provService.getProvincias({ id, ...params });
  }
}
