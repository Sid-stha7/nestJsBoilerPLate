import { DataSource } from "typeorm";

//
import typeormConfig from "../config/mysql.config";

//
export const dataSource = new DataSource(typeormConfig);
