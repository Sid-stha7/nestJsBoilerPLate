import { Injectable } from "@nestjs/common";
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { RolesService } from "src/modules/roles/roles.service";

@ValidatorConstraint({ async: true })
@Injectable()
export class IsRoleAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(protected roleService: RolesService) {}
  async validate(value: string) {
    try {
      const role = await this.roleService.findByName(
        value.toUpperCase().trim(),
      );

      if (role) return false;

      return true;
    } catch (err) {
      return false;
    }
  }
}

export function IsRoleAlreadyExist(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsRoleAlreadyExistConstraint,
    });
  };
}
