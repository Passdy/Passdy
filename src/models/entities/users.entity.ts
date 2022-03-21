import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: UserRole;

  @Column()
  balance: number;

  @Column()
  password: string;

  @Column()
  full_name: string;

  @Column()
  address: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  created_at: string;

  @Column()
  type_confirm: TypeConfirm;

  @Column()
  confirm_code: string;

  @Column()
  status: UserStatus;

  @Column()
  expire_code: string;
}

export enum UserStatus {
  Active = 'active',
  Locked = 'locked',
  Pending = 'pending',
}

export enum TypeConfirm {
  Email = 'email',
  ResetPass = 'reset_pass',
}

export enum UserRole {
  Admin = 'admin',
  Member = 'member',
}
