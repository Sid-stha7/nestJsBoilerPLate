import { Injectable } from "@nestjs/common";

@Injectable()
export class RoleHelper {
  createNewRole(role, roleDetails) {
    if (roleDetails.label) {
      role.label = roleDetails.label;
    }

    if (roleDetails.value) {
      role.value = roleDetails.value;
    }

    return role;
  }

  updateRole(role, roleDetails) {
    if (roleDetails.label) {
      role.label = roleDetails.label;
    }

    if (roleDetails.value) {
      role.value = roleDetails.value;
    }

    return role;
  }
}
