import { Module } from '@nestjs/common';
import { RangeService } from './range.service';
import { RangeController } from './range.controller';

@Module({
  providers: [RangeService],
  controllers: [RangeController]
})
export class RangeModule {}
