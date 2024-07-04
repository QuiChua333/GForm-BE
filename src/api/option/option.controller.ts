import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { OptionService } from './option.service';
import { Response } from 'express';
import { InjectController, InjectRoute } from '@/decorators';
import optionRoutes from './option.routes';

@InjectController({ name: optionRoutes.index })
export class OptionController {
  constructor(private readonly optionService: OptionService) {}

  @InjectRoute(optionRoutes.changeOption)
  async changeOption(@Body() body) {
    const response = await this.optionService.changeOption(body);
    return response;
  }

  @InjectRoute(optionRoutes.addOption)
  async addOption(@Body() body) {
    const response = await this.optionService.addOption(body);
    return response;
  }

  @InjectRoute(optionRoutes.deleteOption)
  async deleteOption(@Res() res: Response, @Param('id') optionId: string) {
    const response = await this.optionService.deleteOption(optionId);
    return response;
  }
}
