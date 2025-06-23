import {
  Entity,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn
} from 'typeorm';
import { Usuario } from './Usuario';
import { Role } from './Role';

@Entity('USUARIOS_ROLES')
export class UsuarioRole {
  @PrimaryColumn({ name: 'USUARIO_SEQ', type: 'number', precision: 19, scale: 2 })
  usuarioSeq: number;

  @PrimaryColumn({ name: 'ROLE_SEQ', type: 'number', precision: 19, scale: 2 })
  roleSeq: number;

  @CreateDateColumn({
    name: 'CADASTRADO',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  cadastrado: Date;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'USUARIO_SEQ', referencedColumnName: 'seq' })
  usuario: Usuario;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'ROLE_SEQ', referencedColumnName: 'seq' })
  role: Role;
}