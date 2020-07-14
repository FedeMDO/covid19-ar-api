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
exports.StatusController = void 0;
const common_1 = require("@nestjs/common");
const status_service_1 = require("./status.service");
const swagger_1 = require("@nestjs/swagger");
const enums_1 = require("../shared/enums");
let StatusController = class StatusController {
    constructor(statusService) {
        this.statusService = statusService;
    }
    async getPais(desde, hasta) {
        return this.statusService.getPais({ desde, hasta });
    }
    async getProvinciasAll(desde, hasta) {
        return this.statusService.getProvinciasAll({ desde, hasta });
    }
    async getProvinciasById(id, desde, hasta) {
        return this.statusService.getProvinciasById(id, { desde, hasta });
    }
    async getLatestPais() {
        return this.statusService.getLatestPais();
    }
    async getLatestProvinciasById(id) {
        return this.statusService.getLatestProvinciasById(id);
    }
};
__decorate([
    swagger_1.ApiOperation({
        summary: 'Obtener las actualizaciones del país',
        description: 'Retorna las actualizaciones registradas para el país, permitiendo filtrar por fechas',
    }),
    swagger_1.ApiQuery({ name: 'desde', required: false, example: '2020-04-01' }),
    swagger_1.ApiQuery({ name: 'hasta', required: false, example: '2020-07-09' }),
    common_1.Get('/pais'),
    __param(0, common_1.Query('desde')),
    __param(1, common_1.Query('hasta')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], StatusController.prototype, "getPais", null);
__decorate([
    swagger_1.ApiOperation({
        summary: 'Obtener las actualizaciones de todas las provincias',
        description: 'Retorna las actualizaciones registradas para todas las provincias, permitiendo filtrar por fechas',
    }),
    swagger_1.ApiQuery({ name: 'desde', required: false, example: '2020-04-01' }),
    swagger_1.ApiQuery({ name: 'hasta', required: false, example: '2020-07-09' }),
    common_1.Get('/provincias'),
    __param(0, common_1.Query('desde')),
    __param(1, common_1.Query('hasta')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], StatusController.prototype, "getProvinciasAll", null);
__decorate([
    swagger_1.ApiOperation({
        summary: 'Obtener las actualizaciones de la provincia',
        description: 'Retorna las actualizaciones registradas para la provincia, permitiendo filtrar por fechas',
    }),
    swagger_1.ApiParam({
        name: 'id',
        description: 'Código oficial de la provincia. Ej. Buenos Aires 06',
        example: '06',
        enum: enums_1.ProvinciaCodigo,
    }),
    swagger_1.ApiQuery({ name: 'desde', required: false, example: '2020-04-01' }),
    swagger_1.ApiQuery({ name: 'hasta', required: false, example: '2020-07-09' }),
    common_1.Get('/provincias/:id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Query('desde')),
    __param(2, common_1.Query('hasta')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], StatusController.prototype, "getProvinciasById", null);
__decorate([
    swagger_1.ApiOperation({
        summary: 'Obtener última actualización del país',
        description: 'Retorna la ultima actualización registrada para el país',
    }),
    common_1.Get('/latest/pais'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StatusController.prototype, "getLatestPais", null);
__decorate([
    swagger_1.ApiOperation({
        summary: 'Obtener última actualización de la provincia',
        description: 'Retorna la ultima actualización registrada para la provincia',
    }),
    swagger_1.ApiParam({
        name: 'id',
        description: 'Código oficial de la provincia. Ej. Buenos Aires: 06',
        example: '06',
        enum: enums_1.ProvinciaCodigo,
    }),
    common_1.Get('/latest/provincias/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StatusController.prototype, "getLatestProvinciasById", null);
StatusController = __decorate([
    swagger_1.ApiTags('status'),
    common_1.Controller('status'),
    __metadata("design:paramtypes", [status_service_1.StatusService])
], StatusController);
exports.StatusController = StatusController;
//# sourceMappingURL=status.controller.js.map