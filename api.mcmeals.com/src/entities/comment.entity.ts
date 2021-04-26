import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "./product.entity";
import { UserEntity } from "./user.entity";

@Entity()
export class CommentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    body: string;

    @ManyToOne(() => UserEntity, user => user.comments)
    user: UserEntity;

    @ManyToOne(() => ProductEntity, product => product.comments)
    product: ProductEntity;
}