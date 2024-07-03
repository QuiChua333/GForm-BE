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

@Controller('option')
export class OptionController {
  constructor(private readonly optionService: OptionService) {}

  @Patch('changeOption')
  async changeOption(@Res() res: Response, @Body() body) {
    try {
      const response = await this.optionService.changeOption(body);
      res.status(HttpStatus.OK).json({
        message: 'Update survey successfully',
        data: response,
      });
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }

  @Post('addOption')
  async addOption(@Res() res: Response, @Body() body) {
    try {
      const response = await this.optionService.addOption(body);
      res.status(HttpStatus.OK).json({
        message: 'Update survey successfully',
        data: response,
      });
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }

  @Delete('deleteOption/:optionId')
  async deleteOption(
    @Res() res: Response,
    @Param('optionId') optionId: string,
  ) {
    try {
      const response = await this.optionService.deleteOption(optionId);
      res.status(HttpStatus.OK).json({
        message: 'Delete survey successfully',
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
