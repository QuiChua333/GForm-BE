import { Module } from '@nestjs/common';
import { MultiChooseGridController } from './multi-choose-grid.controller';
import { MultiChooseGridService } from './multi-choose-grid.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MultiChooseGrid } from './entities/multi-choose-grid.entity';

@Module({
  controllers: [MultiChooseGridController],
  providers: [MultiChooseGridService],
  imports: [TypeOrmModule.forFeature([MultiChooseGrid])],
})
export class MultiChooseGridModule {}
