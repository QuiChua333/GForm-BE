import * as Joi from 'joi';
import { configuration } from '@/config';
import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { TokenModule } from '@/api/token/token.module';
import { DatabaseModule } from '@/database/database.module';
import { FirebaseModule } from '@/firebase/firebase.module';
import { AuthModule } from '@/api/auth/auth.module';
import { CloudinaryModule } from '@/cloudinary/cloudinary.module';
import { EmailModule } from '@/email/email.module';
import { UserModule } from '@/api/user/user.module';
import { SurveyModule } from '@/api/survey/survey.module';
import { QuestionModule } from '@/api/question/question.module';
import { OptionModule } from '@/api/option/option.module';
import { ValidationnModule } from '@/api/validation/validation.module';
import { LinearScaleModule } from '@/api/linear-scale/linear-scale.module';
import { RowModule } from '@/api/row/row.module';
import { GColumnModule } from '@/api/gcolumn/gcolumn.module';
import { ResponseModule } from '@/api/response/response.module';
import { AnswerModule } from '@/api/answer/answer.module';
import { MultiChooseOptionModule } from '@/api/multi-choose-option/multi-choose-option.module';
import { MultiChooseGridModule } from '@/api/multi-choose-grid/multi-choose-grid.module';
import { SurveyShareModule } from '@/api/survey-share/survey-share.module';
import { AppController } from './app.controller';

const EnvSchema = {
  PORT: Joi.number(),
  NODE_ENV: Joi.string(),
  DB_TYPE: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_NAME: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_REFRESH_SECRET: Joi.string().required(),
  MAIL_USERNAME: Joi.string().required(),
  MAIL_PASSWORD: Joi.string().required(),
  CLOUDINARY_NAME: Joi.string().required(),
  CLOUDINARY_API_KEY: Joi.string().required(),
  CLOUDINARY_API_SECRET: Joi.string().required(),
  CLOUDINARY_FOLDER_NAME: Joi.string().required(),
  FIREBASE_TYPE: Joi.string().required(),
  FIREBASE_PROJECT_ID: Joi.string().required(),
  FIREBASE_PRIVATE_KEY_ID: Joi.string().required(),
  FIREBASE_PRIVATE_KEY: Joi.string().required(),
  FIREBASE_CLIENT_EMAIL: Joi.string().required(),
  FIREBASE_CLIENT_ID: Joi.string().required(),
  FIREBASE_AUTH_URI: Joi.string().required(),
  FIREBASE_TOKEN_URI: Joi.string().required(),
  FIREBASE_AUTH_PROVIDE_X509_CERT_URL: Joi.string().required(),
  FIREBASE_CLIENT_X509_CERT_URL: Joi.string().required(),
  FIREBASE_UNIVERSE_DOMAIN: Joi.string().required(),
  FE_BASE_URL: Joi.string().required(),
  FE_PATH_VERIFY_EMAIL: Joi.string().required(),
};

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object().keys(EnvSchema),
      load: [configuration],
    }),

    DatabaseModule,
    EmailModule,
    FirebaseModule,
    CloudinaryModule,
    AuthModule,
    TokenModule,
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
