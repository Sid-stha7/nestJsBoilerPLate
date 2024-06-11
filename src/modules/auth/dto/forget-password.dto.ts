import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

//
export class ForgetPasswordDto {
  @ApiProperty({ type: "string", example: "hello@world.com" })
  @IsString()
  email: string;
}
