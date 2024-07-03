import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTokenDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  verifyEmailToken: string;
}
