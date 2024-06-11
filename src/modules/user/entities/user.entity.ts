import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';



import { BaseEntity } from '../../../models/BaseEntity';
import { DATABASE_TABLES } from '../../../constants/database.enum';
import { AuthRoleEntity } from 'src/modules/roles/entities/role.entity';

export enum UserType {
  USER = 'user',
  PLATFORM = 'platform',
}

@Entity({ name: DATABASE_TABLES.USERS })
export class User extends BaseEntity {

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @ApiProperty({ type: 'number', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: 'string', example: 'John Doe' })
  @Column({ length: 100 })
  name: string;

  @ApiProperty({ type: 'string', example: 'john.doe@example.com' })
  @Column({ length: 100, unique: true })
  email: string;

  @ApiProperty({ type: 'string' })
  @Column({ length: 255 })
  password_hash: string;


  @Column({ type: 'varchar', default: UserType.USER })
  type: UserType;


  @Column({ nullable: true })
  roleId?: number;
  @OneToOne(() => AuthRoleEntity)
  @JoinColumn({ name: 'roleId' })
  role: AuthRoleEntity;

}
