import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

//
export class RegisterDto {
  @ApiProperty({ type: "string", example: "Hello World" })
  @IsString()
  @MinLength(5)
  @MaxLength(70)
  username: string;

  @ApiProperty({ type: "string", example: "hello@world.com" })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ type: "string", example: "Password@123" })
  @IsString()
  password: string;
}
