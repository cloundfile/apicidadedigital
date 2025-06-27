import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('ESTADO')
export class Estado {

  @PrimaryColumn({ name: 'SEQ', type: 'number', precision: 19, scale: 2 })
  seq: number;

  @Column({ name: 'SIGLA', type: 'varchar2', length: 2 })
  sigla: string;

  @Column({ name: 'DESCRICAO', type: 'varchar2', length: 255 })
  descricao: string;

  @CreateDateColumn({ name: 'PUBLISH', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  publish: Date;
}

