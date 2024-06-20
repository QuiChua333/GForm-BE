import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ResponseService } from './response.service';
import { Response } from 'express';
import { CreateResponseDTO } from './DTO/create-response.dto';
import { MyJwtGuard } from 'src/auth/guard/myjwt.guard';

@Controller('response')
export class ResponseController {
  constructor(private readonly responseService: ResponseService) {}

  @Get()
  welcome() {
    return 'Welcome response';
  }

  @Post('/createResponse')
  async createResponse(@Body() body: CreateResponseDTO, @Res() res: Response) {
    try {
      const newResponse = await this.responseService.createResponse(body);
      res.status(HttpStatus.OK).json({
        message: 'Create response successfully',
        data: newResponse,
      });
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }

  @UseGuards(MyJwtGuard)
  @Get('/getResponseSurvey/:id')
  async getResponseSurvey(
    @Param('id') surveyId: string,
    @Res() res: Response,
    @Req() req,
  ) {
    try {
      const { id: userId } = req.user;
      const newResponse = await this.responseService.getResponseSurvey(
        surveyId,
        userId,
      );
      res.status(HttpStatus.OK).json({
        message: 'Get response survey successfully',
        data: newResponse,
      });
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }

  @UseGuards(MyJwtGuard)
  @Get('dataExportResponse/:surveyId')
  async getDataToExportExcel(
    @Param('surveyId') surveyId: string,
    @Res() res: Response,
    @Req() req,
  ) {
    try {
      const { id: userId } = req.user;
      const data = await this.responseService.getDataToExportExcel(
        surveyId,
        userId,
      );
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      );
      res.setHeader(
        'Content-Disposition',
        'attachment; filename=SurveyResponses.xlsx',
      );
      res.status(HttpStatus.OK).send(data);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }
}
