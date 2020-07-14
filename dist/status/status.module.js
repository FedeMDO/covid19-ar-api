"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusModule = void 0;
const common_1 = require("@nestjs/common");
const status_service_1 = require("./status.service");
const status_controller_1 = require("./status.controller");
const mongoose_1 = require("@nestjs/mongoose");
const territory_status_schema_1 = require("./schemas/territory-status.schema");
let StatusModule = class StatusModule {
};
StatusModule = __decorate([
    common_1.Module({
        providers: [status_service_1.StatusService],
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: territory_status_schema_1.TerritoryStatus.name, schema: territory_status_schema_1.TerritoryStatusSchema },
            ]),
        ],
        controllers: [status_controller_1.StatusController],
        exports: [status_service_1.StatusService],
    })
], StatusModule);
exports.StatusModule = StatusModule;
//# sourceMappingURL=status.module.js.map