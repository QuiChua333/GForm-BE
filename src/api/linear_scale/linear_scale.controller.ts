import {
  Body,
  Controller,
  HttpStatus,
  Param,
  Patch,
  Res,
} from '@nestjs/common';
import { LinearScaleService } from './linear_scale.service';
import { Response } from 'express';
import { UpdateLinearScaleDTO } from './DTO/update-linear-scale.dto';

@Controller('linearScale')
export class LinearController {
  constructor(private readonly linearScaleService: LinearScaleService) {}

  @Patch('changeLinearScale')
  async changeLinearScale(@Res() res: Response, @Body() body) {
    try {
      const response = await this.linearScaleService.changeLinearScale(body);
      res.status(HttpStatus.OK).json({
        message: 'Update linear scale successfully',
        data: response,
      });
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }
}
