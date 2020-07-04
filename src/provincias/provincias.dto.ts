import { EnumeracionCasos } from '../shared/info-interfaces';

export default class ProvinciaDTO {
  id_provincia: string;
  provincia: string;
  fecha: string;
  muertes: EnumeracionCasos;
  confirmados: EnumeracionCasos;
}
