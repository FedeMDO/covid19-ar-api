import { StatusService } from './status.service';
import StatusDTO from './status.dto';
export declare class StatusController {
    private readonly statusService;
    constructor(statusService: StatusService);
    getPais(desde?: string, hasta?: string): Promise<StatusDTO[]>;
    getProvinciasAll(desde?: string, hasta?: string): Promise<StatusDTO[]>;
    getProvinciasById(id: string, desde?: string, hasta?: string): Promise<StatusDTO[]>;
    getLatestPais(): Promise<StatusDTO>;
    getLatestProvinciasById(id: string): Promise<StatusDTO>;
}
