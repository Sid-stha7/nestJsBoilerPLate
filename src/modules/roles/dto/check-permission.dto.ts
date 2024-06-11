import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CheckPermissionParam {
  @ApiProperty({
    example: 111,
    description: "permission Id",
    type: Number,
  })
  @IsNotEmpty()
  permissionId: number;

  @ApiProperty({
    example: 111,
    description: "roleId",
    type: Number,
  })
  @IsNotEmpty()
  roleId: number;
}
