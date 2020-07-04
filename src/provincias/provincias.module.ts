import { Module } from '@nestjs/common';
import { ProvinciasService } from './provincias.service';
import { ProvinciasController } from './provincias.controller';

@Module({
  providers: [ProvinciasService],
  controllers: [ProvinciasController]
})
export class ProvinciasModule {}
