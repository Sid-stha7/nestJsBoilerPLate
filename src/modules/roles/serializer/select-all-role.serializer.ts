import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";

class RoleSerializer {
  @ApiProperty({
    description: "role id",
    type: Number,
    example: 111112,
  })
  @Expose()
  id: number;

  @ApiProperty({
    description: "role label",
    type: String,
    example: "ADD ROLE",
  })
  @Expose()
  label: string;

  @ApiProperty({
    description: "bitwise permission of role",
    type: String,
    example: "5444517870735015415413993718908291383295",
  })
  @Expose()
  accessPermissions: string;
}

export class AllRoleSelectSerializer {
  @ApiProperty({
    description: "Message",
    type: String,
    example: "Manufacture fetch success",
  })
  @Expose()
  message: string;

  @ApiProperty({
    description: "role list",
    type: RoleSerializer,
    isArray: true,
  })
  @Expose()
  @Type(() => RoleSerializer)
  data: RoleSerializer[];
}
