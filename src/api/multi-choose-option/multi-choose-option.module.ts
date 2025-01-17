import { Module } from '@nestjs/common';
import { MultiChooseOptionController } from './multi-choose-option.controller';
import { MultiChooseOptionService } from './multi-choose-option.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MultiChooseOption } from './entities/multi-choose-option.entity';

@Module({
  controllers: [MultiChooseOptionController],
  providers: [MultiChooseOptionService],
  imports: [TypeOrmModule.forFeature([MultiChooseOption])],
})
export class MultiChooseOptionModule {}
