import { Injectable } from "@nestjs/common";
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { RolesService } from "src/modules/roles/roles.service";

@ValidatorConstraint({ name: "IsRoleAlreadyExistUpdate", async: true })
@Injectable()
export class IsRoleAlreadyExistConstraintUpdate
  implements ValidatorConstraintInterface
{
  constructor(protected roleService: RolesService) {}
  async validate(name: string, args: ValidationArguments) {
    try {
      const [id] = args.constraints;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const roleId = (args.object as any)[id];
      const role = await this.roleService.findByName(name);

      if (role && role.id !== roleId) return false;

      return true;
    } catch (err) {
      return false;
    }
  }
}

export function IsRoleAlreadyExistUpdate(
  property: string,
  validationOptions?: ValidationOptions,
) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: IsRoleAlreadyExistConstraintUpdate,
    });
  };
}
