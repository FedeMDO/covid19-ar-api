import { Controller, Get, Param } from '@nestjs/common';
import { ProvinciasService } from './provincias.service';
import ProvinciaDTO from './provincias.dto';

@Controller('provincias')
export class ProvinciasController {
  constructor(private readonly provService: ProvinciasService) {}

  @Get()
  async getAll(): Promise<ProvinciaDTO[]> {
    return this.provService.getProvincias();
  }

  // TODO : cambiar nombre por id
  @Get('/:nombre')
  async getOne(@Param('nombre') nombre): Promise<ProvinciaDTO[]> {
    return this.provService.getProvincias(nombre);
  }
}
