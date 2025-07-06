import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Cidade } from './Cidade';

@Entity('WEATHER')
export class Weather {
    @PrimaryColumn({ name: 'SEQ', type: 'number', precision: 19, scale: 2 })
    seq: number;

    @Column({ name: 'ICON', type: 'varchar2', length: 10, nullable: false })
    icon: string;

    @Column({ name: 'TEMP', type: 'number' })
    temp: string;

    @Column({ name: 'MAX', type: 'number'  })
    max: string;

    @Column({ name: 'MIN', type: 'number'  })
    min: string;

    @Column({ name: 'CIDADE', type: 'number' })
    cidadeId: number;

    @ManyToOne(() => Cidade)
    @JoinColumn({ name: 'CIDADE', referencedColumnName: 'seq' })
    cidade: Cidade;

    @CreateDateColumn({ name: 'PUBLISH', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    publish: Date;
}