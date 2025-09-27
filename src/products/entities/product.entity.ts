import { text } from 'node:stream/consumers';
import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Provider } from 'src/providers/entities/provider.entity';
import e from 'express';

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    productId: string;
    @Column({ type: "text" })
    productName: string;
    @Column({ type: "float" })
    price: number;
    @Column({ type: "int" })
    countSeal: number;
    @ManyToOne(() => Provider, (provider) => provider.products,{
        ///eager: true
    })
    provider: Provider;
}
