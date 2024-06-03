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

  @Patch('changeOption/:id')
  async changeOption(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() body: { optionText: string },
  ) {
    try {
      const response = await this.optionService.changeOption(id, body);
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

  @Post('addOption/:questionId')
  async addOption(
    @Res() res: Response,
    @Param('questionId') questionId: string,
    @Body() body: { optionText: string },
  ) {
    try {
      const response = await this.optionService.addOption(questionId, body);
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
