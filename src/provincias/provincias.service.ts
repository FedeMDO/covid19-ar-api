import { Injectable } from '@nestjs/common';
import * as MOCK_DATA from './mock/status-provincias.json';

@Injectable()
export class ProvinciasService {
  async getProvincias(nombre?: string): Promise<any> {
    if (typeof nombre === 'string' && nombre.length) {
      const res = MOCK_DATA.find(x => x.provincia === nombre);
      return res ? res : MOCK_DATA;
    }
    return MOCK_DATA;
  }
}
