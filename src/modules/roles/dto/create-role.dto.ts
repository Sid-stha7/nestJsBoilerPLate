import { ApiProperty } from "@nestjs/swagger";
import { i18nValidationMessage } from "nestjs-i18n";
import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

//

//
export class CreateRoleDto {
  @ApiProperty({
    description: "View label of Role",
    example: "Add User",
  })
  @IsString({ message: i18nValidationMessage("validation.INVALID") })
  @IsNotEmpty({ message: i18nValidationMessage("validation.NOT_EMPTY") })
  label: string;

  
  @ApiProperty({
    description: " ",
    example: false,
    type: Boolean,
  })
  @IsOptional()
  @IsArray({ message: i18nValidationMessage("validation.INVALID") })
  editable: boolean;
}
