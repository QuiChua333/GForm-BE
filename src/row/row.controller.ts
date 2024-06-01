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
import { RowService } from './row.service';
import { Response } from 'express';

@Controller('row')
export class RowController {
  constructor(private readonly rowService: RowService) {}

  @Patch('changeRow/:id')
  async changeRow(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() body: { rowContent: string },
  ) {
    try {
      const response = await this.rowService.changeRow(id, body);
      res.status(HttpStatus.OK).json({
        message: 'Update row successfully',
        data: response,
      });
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }

  @Post('addRow/:questionId')
  async addRow(
    @Res() res: Response,
    @Param('questionId') questionId: string,
    @Body() body: { rowContent: string },
  ) {
    try {
      const response = await this.rowService.addRow(questionId, body);
      res.status(HttpStatus.OK).json({
        message: 'Update row successfully',
        data: response,
      });
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }

  @Delete('deleteRow/:rowId')
  async deleteRow(@Res() res: Response, @Param('rowId') rowId: string) {
    try {
      const response = await this.rowService.deleteRow(rowId);
      res.status(HttpStatus.OK).json({
        message: 'Delete row successfully',
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
