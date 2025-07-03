import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, } from 'typeorm';
import { Usuario } from './Usuario';
import { Cidade } from './Cidade';

@Entity('CIDADE')
export class Empresa {

  @PrimaryColumn({ name: 'SEQ', type: 'number', precision: 19, scale: 0 })
  seq: number;

  @Column({ name: 'CNPJ', type: 'number' })
  cnpj: number;

  @Column({ name: 'TITLE', type: 'varchar2', length: 100 })
  title: string;

  @Column({ name: 'DESCRIPTION', type: 'varchar2', length: 255 })
  description: string;

  @Column({ name: 'THUMBNAIL', type: 'varchar2', length: 255 })
  thumbnail: string;

  @Column({ name: 'ADDRESS', type: 'varchar2', length: 255 })
  address: string;

  @Column({ name: 'EMAIL', type: 'varchar2', length: 255 })
  email: string;

  @Column({ name: 'SITE', type: 'varchar2', length: 100 })
  site: string;

  @Column({ name: 'PHONE', type: 'number' })
  phone: number;

  @Column({ name: 'LATITUDE', type: 'number', precision: 19, scale: 0 })
  latitude: number;

  @Column({ name: 'LONGITUDE', type: 'number', precision: 19, scale: 0 })
  longitude: number;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'USUARIO', referencedColumnName: 'seq' })
  usuario: Usuario;

  @ManyToOne(() => Cidade)  
  @JoinColumn({ name: 'CIDADE', referencedColumnName: 'seq' })
  cidade: Cidade;

  @CreateDateColumn({ name: 'PUBLISH', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  publish: Date;
}