import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';

//
import { RolesService } from './roles.service';
import { RoleHelper } from './helper/role.helper';
import { RolesController } from './roles.controller';
import { AuthRoleEntity } from './entities/role.entity';


//
import { IsRoleAlreadyExistConstraint } from 'src/validator/role.validator';
import { IsRoleAlreadyExistConstraintUpdate } from 'src/validator/update-role.validator';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthRoleEntity]),
  ],
  controllers: [RolesController],
  providers: [
    RolesService,
    RoleHelper,
    IsRoleAlreadyExistConstraint,
    IsRoleAlreadyExistConstraintUpdate,
  ],
  exports: [RolesService],
})
export class RolesModule {}
