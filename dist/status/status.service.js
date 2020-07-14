"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const territory_status_schema_1 = require("./schemas/territory-status.schema");
let StatusService = class StatusService {
    constructor(statusModel) {
        this.statusModel = statusModel;
    }
    async getLatestPais() {
        let queried = await this.statusModel
            .find({ TerritorioID: 'ARG' }, '-_id')
            .exec();
        queried = queried.sort(function (a, b) {
            return ('' + a.Fecha).localeCompare(b.Fecha);
        });
        return queried.pop();
    }
    async getLatestProvinciasAll() {
        throw new Error('Method not implemented.');
    }
    async getLatestProvinciasById(id) {
        let queried = await this.statusModel
            .find({ TerritorioID: id, TerritorioTipo: 'PROV' }, '-_id')
            .exec();
        queried = queried.sort(function (a, b) {
            return ('' + a.Fecha).localeCompare(b.Fecha);
        });
        return queried.pop();
    }
    async getProvinciasAll(params) {
        const conditions = { TerritorioTipo: 'PROV' };
        this.agregarCondicionesFecha(params, conditions);
        return this.statusModel.find(conditions, '-_id').exec();
    }
    async getPais(params) {
        const conditions = { TerritorioTipo: 'PAIS' };
        this.agregarCondicionesFecha(params, conditions);
        return this.statusModel.find(conditions, '-_id').exec();
    }
    async getProvinciasById(id, params) {
        if (!this.validateString(id)) {
            throw new common_1.BadRequestException();
        }
        const conditions = { TerritorioTipo: 'PROV', TerritorioID: id };
        this.agregarCondicionesFecha(params, conditions);
        return this.statusModel.find(conditions, '-_id').exec();
    }
    agregarCondicionesFecha(params, conditions) {
        if (this.validateString(params.desde) &&
            this.validateString(params.hasta)) {
            conditions['Fecha'] = { $gte: params.desde, $lte: params.hasta };
        }
        else if (this.validateString(params.desde) &&
            !this.validateString(params.hasta)) {
            conditions['Fecha'] = { $gte: params.desde };
        }
        else if (!this.validateString(params.desde) &&
            this.validateString(params.hasta)) {
            conditions['Fecha'] = { $lte: params.hasta };
        }
    }
    normalizarNombreProvincia(nombre) {
        return nombre.toLowerCase().replace(/ /g, '');
    }
    validateString(str) {
        return typeof str === 'string' && str.length > 0;
    }
};
StatusService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(territory_status_schema_1.TerritoryStatus.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], StatusService);
exports.StatusService = StatusService;
//# sourceMappingURL=status.service.js.map