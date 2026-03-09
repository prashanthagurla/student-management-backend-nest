import { UserRole } from 'src/enums/user-role';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

//TODO If you want, I can also show you one hidden NestJS + TypeORM mistake that creates
// duplicate tables like user, users, Users, user_entity.
//Almost 80% of developers face this once.

//TODO👉 Why sometimes NestJS creates tables like users, users_users, users_entity automatically.
@Entity('users')
export class Users {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  userId: number;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ name: 'email', unique: true })
  email: string;

  @Column({ name: 'roll_no' })
  rollNumber: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @Column({ name: 'active_flag', nullable: false })
  activeFlag: boolean;

  @Column({ name: 'created_by', nullable: true })
  createdBy: number;

  @CreateDateColumn({ name: 'created_on' })
  createdOn: Date;

  @Column({ name: 'last_updated_by', nullable: true })
  lastUpdatedBy: number;

  @UpdateDateColumn({ name: 'last_updated_on' })
  lastUpdatedOn: Date;
}
