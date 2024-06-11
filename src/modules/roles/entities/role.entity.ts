import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';


//
import { BaseEntity } from '../../../models/BaseEntity';

//
import { DATABASE_TABLES } from '../../../constants/database.enum';

//
@Entity({ name: DATABASE_TABLES.ROLES })
export class AuthRoleEntity extends BaseEntity {
  @Column('varchar')
  label: string;

  @Column('varchar')
  accessPermissions: string;


  @Column({ default: true })
  editable: boolean;

}
