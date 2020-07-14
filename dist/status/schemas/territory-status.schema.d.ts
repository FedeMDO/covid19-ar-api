import { Document } from 'mongoose';
export declare class TerritoryStatus extends Document {
    TerritorioID: string;
    TerritorioNombre: string;
    TerritorioTipo: string;
    Fecha: string;
    Confirmados: {
        Nuevos: number;
        Total: number;
    };
    Muertes: {
        Nuevos: number;
        Total: number;
    };
}
export declare const TerritoryStatusSchema: import("mongoose").Schema<any>;
