import { Entity, PrimaryColumn, Column, CreateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Role } from './Role';

@Entity('USUARIO')
export class Usuario {
  @PrimaryColumn({ name: 'SEQ', type: 'number', precision: 19, scale: 2 })
  seq: number;

  @Column({ name: 'USERNAME', type: 'varchar2', length: 255, nullable: false })
  username: string;

  @Column({ name: 'PASSWORD', type: 'varchar2', length: 255, nullable: false })
  password: string;

  @Column({ name: 'TELEFONE', type: 'number', precision: 12, nullable: false })
  telefone: number;

  @CreateDateColumn({
    name: 'PUBLISH',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  publish: Date;

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'USUARIOS_ROLES',
    joinColumn: { name: 'USUARIO_SEQ', referencedColumnName: 'seq' },
    inverseJoinColumn: { name: 'ROLE_SEQ', referencedColumnName: 'seq' }
  })
  roles: Role[];
}