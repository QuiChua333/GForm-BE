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
import { InjectController, InjectRoute, ReqUser } from '@/decorators';
import responseRoutes from './response.routes';

@InjectController({ name: responseRoutes.index })
export class ResponseController {
  constructor(private readonly responseService: ResponseService) {}

  @InjectRoute(responseRoutes.createResponse)
  async createResponse(@Body() body: CreateResponseDTO) {
    const newResponse = await this.responseService.createResponse(body);

    return newResponse;
  }

  @InjectRoute(responseRoutes.getResponseSurveyById)
  async getResponseSurvey(@Param('id') surveyId: string, @ReqUser() reqUser) {
    const { id: userId } = reqUser;
    const newResponse = await this.responseService.getResponseSurvey(
      surveyId,
      userId,
    );
    return newResponse;
  }

  @InjectRoute(responseRoutes.getDataToExportExcel)
  async getDataToExportExcel(
    @Param('id') surveyId: string,
    @Res() res: Response,
    @ReqUser() reqUser,
  ) {
    try {
      const { id: userId } = reqUser;
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
