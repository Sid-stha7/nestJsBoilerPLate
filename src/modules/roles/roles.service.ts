import { I18nService } from 'nestjs-i18n';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  FindOptionsWhere,
  ILike,
  IsNull,
  Repository,
} from 'typeorm';
import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  forwardRef,
} from '@nestjs/common';

//
import { AuthRoleEntity } from './entities/role.entity';

//
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

//


//
import { RoleHelper } from './helper/role.helper';

import { PaginationRoleQuery } from './dto/pagination.dto';

//
@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(AuthRoleEntity)
    private roleRepository: Repository<AuthRoleEntity>,
    private readonly roleHelper: RoleHelper,
    private readonly i18n: I18nService,
  ) {}

  /**
   * Count role based on different conditions
   */
  async count(options: FindManyOptions<AuthRoleEntity>): Promise<number> {
    const countValue = await this.roleRepository.count(options);
    return countValue;
  }

  /**
   * Get a specific role by ID
   */
  async findRoleById(id: number): Promise<AuthRoleEntity> {
    const roleItem = await this.roleRepository.findOne({ where: { id } });
    return roleItem;
  }

  /**
   * Get All roles
   */
  async findMany(
    options?: PaginationRoleQuery
  ): Promise<[AuthRoleEntity[], number]> {
    const takeValue = options.limit ?? 10;
    const skipValue = options.offset ?? 0;

    //
    const filterOptions: FindOptionsWhere<AuthRoleEntity> = {};

    if (options.search) {
      filterOptions.label = ILike(`%${options.search}%`);
    }


    //
    const rolesWithCount = await this.roleRepository.findAndCount({
      where: filterOptions,
      take: takeValue,
      skip: skipValue,
      order: { created_at: 'DESC' },
    });
    return rolesWithCount;
  }

  /**
   *
   */

  async selectRolePlatform(): Promise<{ data: AuthRoleEntity[] }> {
    const roles = await this.roleRepository.find({
      where: {},
      withDeleted: false,
    });
    return { data: roles };
  }

  async selectAllRole(): Promise<{ data: AuthRoleEntity[] }> {
    const roles = await this.roleRepository.find({});

    return { data: roles };
  }

  /**
   * Create a new role
   */
  async create(
    data: CreateRoleDto,
    manufacturerId?: number,
  ): Promise<AuthRoleEntity> {

    try {
      const newRole = new AuthRoleEntity();

      newRole.label = data.label;

      //


      if (data.editable === false) {
        console.log('hit');

        newRole.editable = false;
      } else {
        newRole.editable = true;
      }


      //
      const savedRole = await this.roleRepository.save(newRole);
      return savedRole;
    } catch (err) {
      throw new InternalServerErrorException(
        this.i18n.t('error.INTERNAL_SERVER_ERROR'),
      );
    }
  }

  // TODO:: Check and rewrite (if necessary) everything below

  // IDK Where this is used
  async findByName(role: string): Promise<AuthRoleEntity> {
    return this.roleRepository.findOne({
      where: { label: ILike(`%${role}%`) },
      withDeleted: true,
    });
  }

  async update(
    id: number,
    dto: UpdateRoleDto,
  ): Promise<AuthRoleEntity> {
    try {
      const filterOptions: FindOptionsWhere<AuthRoleEntity> = { id };

      const role = await this.roleRepository.findOne({
        where: filterOptions,
        withDeleted: true,
      });

      if (!role) {
        throw new BadRequestException(
          this.i18n.t('error.NOT_FOUND_IN_DATABASE', {
            args: { label: 'Role' },
          }),
        );
      }

      if (dto.label) role.label = dto.label;

      console.log(role.accessPermissions);

      return await role.save();
    } catch (err) {
      throw new InternalServerErrorException(
        this.i18n.t('error.INTERNAL_SERVER_ERROR'),
      );
    }
  }

  async fetchAllRole(
    condition,
    options: { pageSize: number; pageNumber: number },
  ): Promise<{ result: AuthRoleEntity[]; total: number }> {
    const take = Number(options.pageSize) || 10;
    const skip = (Number(options.pageNumber) - 1) * take || 0;

    const [result, total] = await this.roleRepository.findAndCount({
      where: condition,
      order: { created_at: 'ASC' },
      take: take,
      skip: skip < 0 ? 0 : skip,
      withDeleted: true,

    });

    return { result, total };
  }

  async fetchSingleRole(
    id: number,
  ): Promise<AuthRoleEntity> {
    return this.roleRepository.findOne({
      where: {
        id: id,
      },
      withDeleted: true,
    });
  }

  async fetchSingleRolePlatform(id: number): Promise<AuthRoleEntity> {
    return this.roleRepository.findOne({
      where: {
        id: id,
      },
      withDeleted: true,
    });
  }

  /**
   * Delete a specific role
   */
  async deleteRole(
    id: number,
  ): Promise<{ message: string }> {
    const filterOptions: FindOptionsWhere<AuthRoleEntity> = { id };

    //
    const role = await this.roleRepository.findOne({
      where: filterOptions,
    });

    //
    if (!role) {
      throw new BadRequestException(
        this.i18n.t('error.NOT_FOUND_IN_DATABASE', {
          args: { label: 'Role' },
        }),
      );
    }
    if (!role.editable) {
      throw new BadRequestException('This role can\'t be deleted');
    }

    await this.roleRepository.remove(role);
    return {
      message: this.i18n.t('messages.DELETED_SUCCESS', {
        args: { label: 'Role' },
      }),
    };
  }

  async fetchRoleByOrg(): Promise<{ data: AuthRoleEntity[]; message: string }> {
    const data = await this.roleRepository.find({});

    return {
      data,

      message: this.i18n.t('messages.FETCH_ALL_ROLE_BY_ORG'),
    };
  }
}
