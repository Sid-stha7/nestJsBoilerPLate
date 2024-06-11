import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

//
export class PaginationRoleQuery {
  @ApiProperty({ type: "number", example: 10, required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  limit?: number;

  @ApiProperty({ type: "number", example: 0, required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  offset?: number;

  //
  @ApiProperty({ type: "string", example: "Warehouse", required: false })
  @IsString()
  @IsOptional()
  search?: string;
}
