import { dataSource } from "src/database/data-source";
import { AuthRoleEntity } from "./role.entity";

export const roleRepository = dataSource.getRepository(AuthRoleEntity);
