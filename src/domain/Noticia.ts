import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Cidade } from './Cidade';
import { Exclude } from 'class-transformer';

@Entity('NOTICIA')
export class Noticia {

  @PrimaryColumn({ name: 'SEQ', type: 'number', precision: 19, scale: 2 })
  seq: number;

  @Column({ name: 'TITLE', type: 'varchar2', length: 255 })
  title: string;

  @Column({ name: 'THUMBNAIL', type: 'varchar2', length: 255 })
  thumbnail: string;

  @Column({ name: 'DESCRICAO', type: 'clob' })
  descricao: string;

  @Column({ name: 'CIDADE_ID', type: 'number', precision: 19, scale: 2 })
   @Exclude()
  cidadeId: number;

  @CreateDateColumn({ name: 'CADASTRADO', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  cadastrado: Date;

  @ManyToOne(() => Cidade)
  @JoinColumn({ name: 'CIDADE_ID', referencedColumnName: 'seq' })
  cidade: Cidade;
}