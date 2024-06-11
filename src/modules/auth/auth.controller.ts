import { Request } from "express";
import { plainToClass } from "class-transformer";
import { Controller, Post, UseGuards, Req, Body } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiSecurity,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

//
import { AuthService } from "./auth.service";

//
import { Public } from "../../decorators/is-public.decorator";
import { LocalAuthGuard } from "../../guards/local-auth.guard";

//
import { LoginDto } from "./dto/login.dto";

//
import { ErrorResponse } from "../../ResponseDocs/ErrorResponse";
import { AuthLogInSerializer } from "./serializer/login.serializer";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { ChangePassworDto } from "./dto/change-password.dto";

//
@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: () => LoginDto })
  @ApiOkResponse({
    description: "Ok Response",
    type: AuthLogInSerializer,
  })
  @ApiBadRequestResponse({
    description: "Bad Request Error",
    type: ErrorResponse,
  })
  @ApiUnauthorizedResponse({
    description: "Unauthorize User",
    type: ErrorResponse,
  })
  @Post("/login")
  async login(@Req() req: Request) {
    return plainToClass(
      AuthLogInSerializer,

      await this.authService.login(req.user),
      { strategy: "excludeAll" },
    );
  }

  @Post("/change-password")
  @ApiBearerAuth()
  @ApiSecurity("access-token")
  @UseGuards(JwtAuthGuard)
  async changePassword(
    @Body() data: ChangePassworDto,
    @Req() request: Request,
  ) {
    return this.authService.changePassword(data, request.user);
  }

  // @Public()
  // @Post("/register")
  // async register(@Body() data: RegisterDto) {
  //   return this.authService.register(data);
  // }

  // @Public()
  // @Post("/forget-password")
  // async forgetPassword(@Body() data: ForgetPasswordDto) {
  //   return this.authService.forgetPasword(data);
  // }

  // @Public()
  // @Post("/reset-password")
  // async resetPasword(@Body() data: ResetPasswordDto) {
  //   return this.authService.resetPasword(data);
  // }
}
