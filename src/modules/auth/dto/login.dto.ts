import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

//
export class LoginDto {
  @ApiProperty({ type: "string", example: "admin@dravya.com" })
  @IsString()
  email: string;

  @ApiProperty({ type: "string", example: "Password@123" })
  @IsString()
  password: string;
}
