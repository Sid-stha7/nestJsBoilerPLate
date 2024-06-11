import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ChangePassworDto {
  @ApiProperty({
    description: "Current Password",
    example: "current password",
  })
  @IsString()
  @IsNotEmpty()
  currentPassword: string;

  @ApiProperty({
    description: "New Password",
    example: "new password",
  })
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
