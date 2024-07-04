import {
  Body,
  Controller,
  HttpStatus,
  Param,
  Patch,
  Res,
} from '@nestjs/common';
import { LinearScaleService } from './linear-scale.service';
import { Response } from 'express';
import { UpdateLinearScaleDTO } from './DTO/update-linear-scale.dto';
import { InjectController, InjectRoute } from '@/decorators';
import linearScaleRoutes from './linear-scale.routes';

@InjectController({ name: linearScaleRoutes.index })
export class LinearController {
  constructor(private readonly linearScaleService: LinearScaleService) {}

  @InjectRoute(linearScaleRoutes.changeLinearScale)
  async changeLinearScale(@Body() body) {
    const response = await this.linearScaleService.changeLinearScale(body);
    return response;
  }
}
