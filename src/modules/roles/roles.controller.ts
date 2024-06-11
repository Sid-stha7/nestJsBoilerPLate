import { plainToClass } from 'class-transformer';
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Param,
  Get,
  Delete,
  Patch,
  Query,
  Req,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiParam,
  ApiSecurity,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

//
import type { Request } from 'express';

//
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PaginationRoleQuery } from './dto/pagination.dto';

//
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';


//
import { RolesService } from './roles.service';

import { ErrorResponse } from 'src/ResponseDocs/ErrorResponse';


//
import { SingleRoleSerializer } from './serializer/role.serializer';
import { UpdateRoleSerializer } from './serializer/role-update.serializer';
import { DeleteRoleSerializer } from './serializer/role-deleted.serializer';

//
@UseGuards(JwtAuthGuard,)
@ApiSecurity('access-token')
@Controller('')
@ApiBadRequestResponse({
  description: 'Unable to add',
  type: ErrorResponse,
})
@ApiUnauthorizedResponse({
  description: 'Unauthorize Access',
  type: ErrorResponse,
})
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  /**
   * Create a new role for the platform
   */
  @ApiTags('Platform Roles')
  @Post('/roles')

  async createNewPlatformRole(@Body() roleData: CreateRoleDto) {
    const response = await this.rolesService.create(roleData);

    return {
      data: response,
      message: 'Successfully created new role for platform',
    };
  }

  /**
   * Get paginated list of platform roles
   */
  @ApiTags('Platform Roles')
  @Get('/roles')

  async fetchAll(@Query() query: PaginationRoleQuery) {
    const [platformRoles, count] = await this.rolesService.findMany({
      ...query,

    });

    //
    return {
      message: '',
      data: platformRoles,
      pagination: {
        total: count,
      },
    };
  }

  /*
   ** get platform roles
   */
  @ApiTags('Platform Roles')


  @Get('/manufacturers/platform-roles')
  @ApiBadRequestResponse({
    description: 'Unable to fetch',
    type: ErrorResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorize Access',
    type: ErrorResponse,
  })
  async fetchAllPlatformRoleSelect(@Req() request: Request) {
    //
    const roles = await this.rolesService.selectRolePlatform();

    //
    return {
      message: '',
      data: roles.data,
    };
  }

  /**
   * Get single platform role details
   */
  @ApiTags('Platform Roles')
  @Get('/roles/:roleId')

  async fetchPlatformRoleDetails(@Param('roleId') roleId: number) {
    const roleDetails = await this.rolesService.findRoleById(roleId);

    //
    return {
      message: '',
      data: roleDetails,
    };
  }

  /**
   * Update platform role
   */
  @ApiTags('Platform Roles')
  @Patch('/roles/:roleId')

  async updatePlatformRole(
    @Param('roleId') roleId: number,
    @Body() data: UpdateRoleDto,
  ) {
    const roleDetails = await this.rolesService.update(roleId, data);

    //
    return {
      message: '',
      data: roleDetails,
    };
  }

  /**
   * Delete platform role
   */
  @ApiTags('Platform Roles')
  @Delete('/roles/:roleId')

  async deletePlatformRole(@Param('roleId') roleId: number) {
    await this.rolesService.deleteRole(roleId);

    return {
      message: '',
    };
  }

  @ApiTags('Manufacturer Roles')

  @Post('/manufacturers/:manufacturerId/roles')
  @ApiOkResponse({
    status: 201,
    description: 'role output for add',
    type: SingleRoleSerializer,
  })
  @ApiBadRequestResponse({
    description: 'Unable to add',
    type: ErrorResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorize Access',
    type: ErrorResponse,
  })
  @ApiParam({
    name: 'manufacturerId',
    description: 'Manufacturer ID',
    type: 'number',
    required: true,
  })
  async create(
    @Body() createRoleDto: CreateRoleDto,
    @Req() request: Request,
  ): Promise<SingleRoleSerializer> {


    //
    return plainToClass(
      SingleRoleSerializer,
      await this.rolesService.create(createRoleDto,),
      { strategy: 'excludeAll' },
    );
  }

  @ApiTags('Manufacturer Roles')

  @Get('/manufacturers/:manufacturerId/roles')
  @ApiBadRequestResponse({
    description: 'Unable to add',
    type: ErrorResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorize Access',
    type: ErrorResponse,
  })
  async fetchAllSelect(
    @Req() request: Request,
    @Query() query: PaginationRoleQuery,
  ) {


    //
    const [platformRoles, count] = await this.rolesService.findMany({
      ...query,

    });

    //
    return {
      message: '',
      data: platformRoles,
      pagination: {
        total: count,
      },
    };
  }

  @ApiTags('Manufacturer Roles')

  @Get('/manufacturers/:manufacturerId/manufacturer-roles')
  @ApiBadRequestResponse({
    description: 'Unable to fetch',
    type: ErrorResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorize Access',
    type: ErrorResponse,
  })
  @ApiParam({
    name: 'manufacturerId',
    description: 'Manufacturer ID',
    type: 'number',
    required: true,
  })
  async fetchAllRoleSelect(@Req() request: Request) {


    //
    const roles = await this.rolesService.selectAllRole();

    //
    return {
      message: '',
      data: roles.data,
    };
  }

  @ApiTags('Manufacturer Roles')

  @Get('/manufacturers/:manufacturerId/roles/:roleId')
  @ApiSecurity('access-token')
  @ApiOkResponse({
    description: 'Single Role for User',
    type: SingleRoleSerializer,
  })
  @ApiBadRequestResponse({
    description: 'Unable to add',
    type: ErrorResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorize Access',
    type: ErrorResponse,
  })
  @ApiParam({
    name: 'roleId',
    description: 'Role Id',
    type: 'number',
    required: true,
  })
  @ApiParam({
    name: 'manufacturerId',
    description: 'Manufacturer ID',
    type: 'number',
    required: true,
  })
  async fetchSingleRole(
    @Param('roleId') roleId: number,
    @Req() request: Request,
  ): Promise<SingleRoleSerializer> {


    //
    const role = await this.rolesService.fetchSingleRole(
      roleId);

    return plainToClass(SingleRoleSerializer, role, { strategy: 'excludeAll' });
  }

  @ApiTags('Manufacturer Roles')

  @Patch('/manufacturers/:manufacturerId/roles/:roleId')
  @ApiSecurity('access-token')
  @ApiOkResponse({
    description: 'role output ',
    type: UpdateRoleSerializer,
  })
  @ApiBadRequestResponse({
    description: 'Unable to add',
    type: ErrorResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorize Access',
    type: ErrorResponse,
  })
  @ApiParam({
    name: 'roleId',
    description: 'Role Id to Update',
    type: 'number',
    required: true,
  })
  @ApiParam({
    name: 'manufacturerId',
    description: 'Manufacturer ID',
    type: 'number',
    required: true,
  })
  async update(
    @Body() body: UpdateRoleDto,
    @Param('roleId') roleId: number,
    @Req() request: Request,
  ): Promise<UpdateRoleSerializer> {


    //
    return plainToClass(
      UpdateRoleSerializer,
      await this.rolesService.update(roleId, body),
      { strategy: 'excludeAll' },
    );
  }

  @ApiTags('Manufacturer Roles')

  @Delete('/manufacturers/:manufacturerId/roles/:roleId')
  @ApiSecurity('access-token')
  @ApiOkResponse({
    description: 'role output ',
    type: DeleteRoleSerializer,
  })
  @ApiBadRequestResponse({
    description: 'Unable to add',
    type: ErrorResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorize Access',
    type: ErrorResponse,
  })
  @ApiParam({
    name: 'roleId',
    description: 'Role Id to Update',
    type: 'number',
    required: true,
  })
  @ApiParam({
    name: 'manufacturerId',
    description: 'Manufacturer ID',
    type: 'number',
    required: true,
  })
  async deleteRole(
    @Param() param: { roleId: number; manufacturerId: number },
  ): Promise<DeleteRoleSerializer> {
    const out = await this.rolesService.deleteRole(
      param.roleId,
    );

    return plainToClass(
      DeleteRoleSerializer,
      { message: out.message },
      { strategy: 'excludeAll' },
    );
  }
}
