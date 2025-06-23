import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Estado } from './Estado';

@Entity('CIDADE')
export class Cidade {

  @PrimaryColumn({ name: 'SEQ', type: 'number', precision: 19, scale: 2 })
  seq: number;

  @Column({ name: 'DESCRICAO', type: 'varchar2', length: 255 })
  descricao: string;

  @Column({ name: 'ESTADO_ID', type: 'number', precision: 19, scale: 2 })
  estadoId: number;

  @Column({ name: 'DOMINIO', type: 'varchar2', length: 255 })
  dominio: string;

  @CreateDateColumn({ name: 'CADASTRADO', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  cadastrado: Date;

  @ManyToOne(() => Estado)
  @JoinColumn({ name: 'ESTADO_ID', referencedColumnName: 'seq' })
  estado: Estado;
}
