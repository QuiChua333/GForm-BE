import { Module } from '@nestjs/common';
import { GColumnController } from './gcolumn.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GColumn } from './Entity/gcolumn';
import { GColumnService } from './gcolumn.service';

@Module({
  controllers: [GColumnController],
  providers: [GColumnService],
  imports: [TypeOrmModule.forFeature([GColumn])],
})
export class GColumnModule {}
