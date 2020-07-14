import { StatusParams } from './status.interfaces';
import StatusDTO from './status.dto';
import { Model } from 'mongoose';
import { TerritoryStatus } from './schemas/territory-status.schema';
export declare class StatusService {
    private readonly statusModel;
    constructor(statusModel: Model<TerritoryStatus>);
    getLatestPais(): Promise<StatusDTO>;
    getLatestProvinciasAll(): Promise<StatusDTO[]>;
    getLatestProvinciasById(id: string): Promise<StatusDTO>;
    getProvinciasAll(params?: Partial<StatusParams>): Promise<StatusDTO[]>;
    getPais(params?: Partial<StatusParams>): Promise<StatusDTO[]>;
    getProvinciasById(id: string, params?: Partial<StatusParams>): Promise<StatusDTO[]>;
    agregarCondicionesFecha(params: Partial<StatusParams>, conditions: any): void;
    normalizarNombreProvincia(nombre: string): string;
    validateString(str: string): boolean;
}
