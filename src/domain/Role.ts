import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  ManyToMany
} from 'typeorm';
import { Usuario } from './Usuario';
import { Exclude } from 'class-transformer';

@Entity('ROLE')
export class Role {
  @PrimaryColumn({ name: 'SEQ', type: 'number', precision: 19, scale: 2 })
  seq: number;

  @Column({ name: 'DESCRICAO', type: 'varchar2', length: 10, nullable: false })
  descricao: string;

  @CreateDateColumn({
    name: 'PUBLISH',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  publish: Date;

  @ManyToMany(() => Usuario, usuario => usuario.roles)
  @Exclude()
  usuarios: Usuario[];
}