import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class SingleRoleSerializer {
  @ApiProperty({
    description: "role id",
    type: Number,
    example: 111112,
  })
  @Expose()
  id: number;

  @ApiProperty({
    description: "Access permissions of the role",
    type: String,
    example: "123",
  })
  @Expose()
  accessPermissions: string;

  @ApiProperty({
    description: "role label",
    type: String,
    example: "ADD ROLE",
  })
  @Expose()
  label: string;

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
}

export class IsActive {
  @ApiProperty({
    description: "id permission active in role",
    type: Boolean,
  })
  @Expose()
  isActive: boolean;
}
