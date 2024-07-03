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

@Controller('gcolumn')
export class GColumnController {
  constructor(private readonly gcolumnService: GColumnService) {}

  @Patch('changeGColumn')
  async changeGColumn(@Res() res: Response, @Body() body) {
    try {
      const response = await this.gcolumnService.changeGColumn(body);
      res.status(HttpStatus.OK).json({
        message: 'Update gcolumn successfully',
        data: response,
      });
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }

  @Post('addGColumn')
  async addGColumn(@Res() res: Response, @Body() body) {
    try {
      const response = await this.gcolumnService.addGColumn(body);
      res.status(HttpStatus.OK).json({
        message: 'Update gcolumn successfully',
        data: response,
      });
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }

  @Delete('deleteGColumn/:gcolumnId')
  async deleteGColumn(
    @Res() res: Response,
    @Param('gcolumnId') gcolumnId: string,
  ) {
    try {
      const response = await this.gcolumnService.deleteGColumn(gcolumnId);
      res.status(HttpStatus.OK).json({
        message: 'Delete gcolumn successfully',
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
