import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

//
export class ResetPasswordDto {
  @ApiProperty({ type: "string", example: "Password@123" })
  @IsString()
  password: string;

  @ApiProperty({ type: "string", example: "asdfghjkqwertyu" })
  @IsString()
  code: string;
}
