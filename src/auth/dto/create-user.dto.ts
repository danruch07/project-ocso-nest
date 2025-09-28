import { IsEmail, IsIn, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  userEmail: string;
  @IsString()
  @MaxLength(80)
  userPassword: string;
  @IsOptional()
  @IsIn(["Admin", "Employee", "Manager"])
  userRoles: string[];
}
