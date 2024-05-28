import { Controller } from '@nestjs/common';
import { LinearScaleService } from './linear_scale.service';

@Controller('linearScale')
export class LinearController {
  constructor(private readonly linearScaleService: LinearScaleService) {}
}
