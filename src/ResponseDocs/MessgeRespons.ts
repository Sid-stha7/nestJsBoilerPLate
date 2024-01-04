import { ApiProperty } from "@nestjs/swagger";

export class ApiMessageResponse {
  @ApiProperty()
  message: string;

  @ApiProperty()
  statusCode: number;
}
