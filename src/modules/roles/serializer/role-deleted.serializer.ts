import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class DeleteRoleSerializer {
  @ApiProperty({
    description: "Message",
    type: String,
    example: "Role Deleted success",
  })
  @Expose()
  message?: string;
}
