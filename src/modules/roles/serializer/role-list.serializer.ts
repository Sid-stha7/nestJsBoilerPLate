import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";

class RoleData {
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
}

export class RoleListSerializer {
  @ApiProperty({
    description: "Message",
    type: String,
    example: "Organization fetch success",
  })
  @Expose()
  message: string;

  @ApiProperty({ description: "role list", type: RoleData })
  @Expose()
  @Type(() => RoleData)
  data: RoleData[];
}
