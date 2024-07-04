import { Module } from '@nestjs/common';
import { LinearController } from './linear-scale.controller';
import { LinearScaleService } from './linear-scale.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinearScale } from './entities/linear-scale.entity';

@Module({
  controllers: [LinearController],
  providers: [LinearScaleService],
  imports: [TypeOrmModule.forFeature([LinearScale])],
})
export class LinearScaleModule {}
