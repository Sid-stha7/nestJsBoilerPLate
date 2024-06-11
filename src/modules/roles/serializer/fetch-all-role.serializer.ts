import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform, Type } from "class-transformer";

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
    description: "role value",
    type: String,
    example: "k",
  })
  @Expose()
  value: string;

  @ApiProperty({
    description: "created data",
    type: Date,
    example: new Date(),
  })
  @Expose()
  created_at: Date;

  @ApiProperty({
    description: "updated at date",
    type: Date,
    example: new Date(),
  })
  @Expose()
  updated_at: Date;

  deleted_at: Date | null;

  @ApiProperty({
    type: Boolean,
    description: "is Active role",
    example: true,
  })
  @Expose()
  @Transform((value) => {
    return value.obj.deleted_at === null ? true : false;
  })
  isActive: true;
}

export class ManyRoleSerializer {
  @ApiProperty({
    description: "total number of role",
    example: 100,
  })
  @Expose()
  total: number;

  @ApiProperty({
    isArray: true,
    type: RoleSerializer,
  })
  @Expose()
  @Type(() => RoleSerializer)
  result: RoleSerializer[];
}
