import { Module } from '@nestjs/common';
import { LinearController } from './linear_scale.controller';
import { LinearScaleService } from './linear_scale.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinearScale } from './Entity/linear_scale';

@Module({
  controllers: [LinearController],
  providers: [LinearScaleService],
  imports: [TypeOrmModule.forFeature([LinearScale])],
})
export class LinearScaleModule {}
