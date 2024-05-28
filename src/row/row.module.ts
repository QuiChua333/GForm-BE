import { Module } from '@nestjs/common';
import { RowController } from './row.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Row } from './Entity/row';
import { RowService } from './row.service';

@Module({
  controllers: [RowController],
  providers: [RowService],
  imports: [TypeOrmModule.forFeature([Row])],
})
export class RowModule {}
