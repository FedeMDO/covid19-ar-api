import { Injectable, NotFoundException } from '@nestjs/common';
import * as MOCK_DATA from './mock/status-provincias.json';
import { ProvinciasParams } from './provincias.interfaces';
import ProvinciaDTO from './provincias.dto';

@Injectable()
export class ProvinciasService {
  async getProvincias(
    params?: Partial<ProvinciasParams>,
  ): Promise<ProvinciaDTO[]> {
    let result = new Array<ProvinciaDTO>();

    if (params.id || params.provincia) {
      result = this.filterByProvincia(params, MOCK_DATA);
      if (result.length === 0) {
        throw new NotFoundException(
          null,
          'Revise los parametros de la consulta',
        );
      }
    } else {
      result = MOCK_DATA;
    }

    if (this.validateString(params.desde)) {
      result = result.filter(x => x.fecha >= params.desde);
    }

    if (this.validateString(params.hasta)) {
      result = result.filter(x => x.fecha <= params.hasta);
    }

    return result;
  }

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

  filterByProvincia(
    params: Partial<ProvinciasParams>,
    data: ProvinciaDTO[],
  ): ProvinciaDTO[] {
    let result = new Array<ProvinciaDTO>();

    // si prioriza la existencia de un id en la consulta
    if (this.validateString(params.id)) {
      result = data.filter(
        x => this.normalizarNombreProvincia(x.id_provincia) === params.id,
      );
    } else if (this.validateString(params.provincia)) {
      const nombreAproximado = this.normalizarNombreProvincia(params.provincia);
      result = data.filter(
        x => this.normalizarNombreProvincia(x.provincia) === nombreAproximado,
      );
    }
    return result;
  }
}
