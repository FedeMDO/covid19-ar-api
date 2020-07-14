"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const rateLimit = require("express-rate-limit");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.use(rateLimit({
        windowMs: 1 * 60 * 1000,
        max: 4 * 60,
    }));
    const options = new swagger_1.DocumentBuilder()
        .setTitle('COVID19 Status Argentina')
        .setDescription('API de casos de COVID19 en Argentina a nivel nacional, provincial y departamental. Las fechas deben pasarse en formato Date ISO 8601 (yyyy-mm-dd)')
        .setVersion('1.0')
        .setContact('Federico Montes de Oca', 'https://github.com/FedeMDO', 'federicomdo97@gmail.com')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api', app, document, {
        customSiteTitle: 'COVID19 Argentina API',
    });
    await app.listen(process.env.PORT || 80);
}
bootstrap();
//# sourceMappingURL=main.js.map