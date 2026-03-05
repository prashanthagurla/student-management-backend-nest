import { UserRole } from 'src/enums/user-role';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Users')
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

  @Column({ name: 'created_by', nullable: true })
  createdBy: number;

  @CreateDateColumn({ name: 'created_on' })
  createdOn: Date;

  @Column({ name: 'last_updated_by', nullable: true })
  lastUpdatedBy: number;

  @UpdateDateColumn({ name: 'last_updated_on' })
  lastUpdatedOn: Date;
}
