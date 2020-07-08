import { Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { StatusController } from './status.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TerritoryStatusSchema,
  TerritoryStatus,
} from './schemas/territory-status.schema';

@Module({
  providers: [StatusService],
  imports: [
    MongooseModule.forFeature([
      { name: TerritoryStatus.name, schema: TerritoryStatusSchema },
    ]),
  ],
  controllers: [StatusController],
  exports: [StatusService],
})
export class StatusModule {}
