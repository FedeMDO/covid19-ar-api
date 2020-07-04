import { EnumeracionCasos } from '../shared/info-interfaces';

export default class ProvinciaDTO {
  provincia: string;
  fecha: string;
  muertes: EnumeracionCasos;
  confirmados: EnumeracionCasos;
}
