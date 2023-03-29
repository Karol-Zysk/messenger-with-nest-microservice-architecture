import { IsEmail, IsString } from 'class-validator';

export class NewUserDTO {
  firstName: string;
  lastName: string;
  @IsEmail()
  @IsString()
  email: string;
  password: string;
}
