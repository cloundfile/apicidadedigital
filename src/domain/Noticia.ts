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

  @Column({ name: 'DESCRIPTION', type: 'clob' })
  description: string;

  @Column({ name: 'WEBLINK', type: 'varchar2', length: 255 })
  weblink: string;

  @Column({ name: 'CITY_ID', type: 'number', precision: 19, scale: 2 })
  @Exclude()
  cityId: number;

  @CreateDateColumn({ name: 'PUBLISH', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  publish: Date;

  @ManyToOne(() => Cidade)
  @JoinColumn({ name: 'CITY_ID', referencedColumnName: 'seq' })
  cidade: Cidade;
}