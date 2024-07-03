import { IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';

export class ChangePasswordDTO {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  currentPassword: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  newPassword: string;
}
