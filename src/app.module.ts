import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { SurveyModule } from './survey/survey.module';
import { QuestionModule } from './question/question.module';
import { OptionModule } from './option/option.module';
import { ValidationnModule } from './validation/validation.module';
import { LinearScaleModule } from './linear_scale/linear_scale.module';
import { RowModule } from './row/row.module';
import { GColumnModule } from './gcolumn/gcolumn.module';
import { ResponseModule } from './response/response.module';
import { AnswerModule } from './answer/answer.module';
import { MultiChooseOptionModule } from './multi-choose-option/multi-choose-option.module';
import { MultiChooseGridModule } from './multi-choose-grid/multi-choose-grid.module';
import { SurveyShareModule } from './survey-share/survey-share.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),

    AuthModule,
    UserModule,
    SurveyModule,
    QuestionModule,
    OptionModule,
    ValidationnModule,
    LinearScaleModule,
    RowModule,
    GColumnModule,
    ResponseModule,
    AnswerModule,
    MultiChooseOptionModule,
    MultiChooseGridModule,
    SurveyShareModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
