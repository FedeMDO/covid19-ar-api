import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import * as MOCK_DATA from './mock/status-provincias.json';
import { StatusParams } from './status.interfaces';
import StatusDTO from './status.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TerritoryStatus } from './schemas/territory-status.schema';

@Injectable()
export class StatusService {
  constructor(
    @InjectModel(TerritoryStatus.name)
    private readonly statusModel: Model<TerritoryStatus>,
  ) {}
  async getProvinciasAll(params?: Partial<StatusParams>): Promise<StatusDTO[]> {
    const conditions = { TerritorioTipo: 'PROV' };
    this.agregarCondicionesFecha(params, conditions);
    return this.statusModel.find(conditions, '-_id').exec();
  }

  async getPais(params?: Partial<StatusParams>): Promise<StatusDTO[]> {
    const conditions = { TerritorioTipo: 'PAIS' };
    this.agregarCondicionesFecha(params, conditions);
    return this.statusModel.find(conditions, '-_id').exec();
  }

  async getProvinciasById(
    id: string,
    params?: Partial<StatusParams>,
  ): Promise<StatusDTO[]> {
    if (!this.validateString(id)) {
      throw new BadRequestException();
    }
    const conditions = { TerritorioTipo: 'PROV', TerritorioID: id };
    this.agregarCondicionesFecha(params, conditions);
    return this.statusModel.find(conditions, '-_id').exec();
  }

  agregarCondicionesFecha(params: Partial<StatusParams>, conditions): void {
    if (
      this.validateString(params.desde) &&
      this.validateString(params.hasta)
    ) {
      conditions['Fecha'] = { $gte: params.desde, $lte: params.hasta };
    } else if (
      this.validateString(params.desde) &&
      !this.validateString(params.hasta)
    ) {
      conditions['Fecha'] = { $gte: params.desde };
    } else if (
      !this.validateString(params.desde) &&
      this.validateString(params.hasta)
    ) {
      conditions['Fecha'] = { $lte: params.hasta };
    }
  }
  // async getStatuses(params?: Partial<StatusParams>): Promise<StatusDTO[]> {
  //   let result = new Array<StatusDTO>();

  //   if (params.id || params.provincia) {
  //     result = this.filterByProvincia(params, MOCK_DATA);
  //     if (result.length === 0) {
  //       throw new NotFoundException(
  //         null,
  //         'Revise los parametros de la consulta',
  //       );
  //     }
  //   } else {
  //     result = MOCK_DATA;
  //   }

  //   if (this.validateString(params.desde)) {
  //     result = result.filter(x => x.fecha >= params.desde);
  //   }

  //   if (this.validateString(params.hasta)) {
  //     result = result.filter(x => x.fecha <= params.hasta);
  //   }

  //   return result;
  // }

  /**
   * Normaliza string eliminando espacios y convirtiendo a minusculas
   * @param nombre Nombre a ser normalizado
   */
  normalizarNombreProvincia(nombre: string): string {
    return nombre.toLowerCase().replace(/ /g, '');
  }

  validateString(str: string): boolean {
    return typeof str === 'string' && str.length > 0;
  }

  //   filterByProvincia(
  //     params: Partial<StatusParams>,
  //     data: StatusDTO[],
  //   ): StatusDTO[] {
  //     let result = new Array<StatusDTO>();

  //     // si prioriza la existencia de un id en la consulta
  //     if (this.validateString(params.id)) {
  //       result = data.filter(
  //         x => this.normalizarNombreProvincia(x.id_provincia) === params.id,
  //       );
  //     } else if (this.validateString(params.provincia)) {
  //       const nombreAproximado = this.normalizarNombreProvincia(params.provincia);
  //       result = data.filter(
  //         x => this.normalizarNombreProvincia(x.provincia) === nombreAproximado,
  //       );
  //     }
  //     return result;
  //   }
}
