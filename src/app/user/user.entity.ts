import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Permission } from '../permission/entities/permission.entity';
import { Role } from '../permission/entities/role.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  nickname: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: false })
  emailVerified: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(type => Permission)
  @JoinTable()
  permissions: Permission[];

  @ManyToMany(type => Role)
  @JoinTable()
  roles: Role[];

  async givePermissionTo(name: string) {
    const permission = await Permission.findOne({ name });
    if (permission) {
      await User.createQueryBuilder()
        .relation(User, 'permissions')
        .of(this)
        .add(permission);
    }
  }

  async revokePermissionTo(name: string) {
    const permission = await Permission.findOne({ name });
    if (permission) {
      await User.createQueryBuilder()
        .relation(User, 'permissions')
        .of(this)
        .remove(permission);
    }
  }

  async hasPermissionTo(name: string) {
    // .where('permission.name = :name', { name })
    return await User.createQueryBuilder()
      .andWhere('permission.name = :name', { name: '123' })
      .relation(User, 'permissions')
      .of(this)
      // .loadOne()
      .getSql();
  }

  toJSON() {
    const user = { ...this };
    delete user.password;
    return user;
  }
}
