import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class AuthLogInSerializer {
  @ApiProperty({
    description: "access token after login",
    example:
      "lfjaojfoejofjaofjeoawjrojweffaaf.fdfeafafafafafeawfargragrgfdgf.gregregregresgger",
  })
  @Expose()
  accessToken: string;
}
