import { Entity, PrimaryColumn, Column, CreateDateColumn, ManyToMany, JoinTable, ManyToOne, JoinColumn } from 'typeorm';
import { Role } from './Role';
import { Cidade } from './Cidade';

@Entity('USUARIO')
export class Usuario {
  @PrimaryColumn({ name: 'SEQ', type: 'number', precision: 19, scale: 2 })
  seq: number;

  @Column({ name: 'FULLNAME', type: 'varchar2', length: 255 })
  fullname: string;

  @Column({ name: 'USERNAME', type: 'varchar2', length: 255 })
  username: string;

  @Column({ name: 'PASSWORD', type: 'varchar2', length: 255 })
  password: string;

  @Column({ name: 'EMAIL', type: 'varchar2', length: 255 })
  email: string;

  @Column({ name: 'PHONE', type: 'number', precision: 12 })
  phone: number;  

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'USUARIOS_ROLES',
    joinColumn: { name: 'USUARIO_SEQ', referencedColumnName: 'seq' },
    inverseJoinColumn: { name: 'ROLE_SEQ', referencedColumnName: 'seq' }
  })
  roles: Role[];

  @Column({ name: 'CIDADE', type: 'number' })
  cidadeId: number;

  @ManyToOne(() => Cidade)
  @JoinColumn({ name: 'CIDADE', referencedColumnName: 'seq' })
  cidade: Cidade;

  @CreateDateColumn({ name: 'PUBLISH', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  publish: Date;
}