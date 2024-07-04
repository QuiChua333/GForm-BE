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
import { GColumnService } from './gcolumn.service';
import { Response } from 'express';
import { InjectController, InjectRoute } from '@/decorators';
import gcolumnRoutes from './gcolumn.routes';

@InjectController({ name: gcolumnRoutes.index })
export class GColumnController {
  constructor(private readonly gcolumnService: GColumnService) {}

  @InjectRoute(gcolumnRoutes.changeGColumn)
  async changeGColumn(@Body() body) {
    const response = await this.gcolumnService.changeGColumn(body);
    return response;
  }

  @InjectRoute(gcolumnRoutes.addGColumn)
  async addGColumn(@Body() body) {
    const response = await this.gcolumnService.addGColumn(body);
    return response;
  }

  @InjectRoute(gcolumnRoutes.deleteGColumn)
  async deleteGColumn(@Param('id') gcolumnId: string) {
    const response = await this.gcolumnService.deleteGColumn(gcolumnId);
    return response;
  }
}
