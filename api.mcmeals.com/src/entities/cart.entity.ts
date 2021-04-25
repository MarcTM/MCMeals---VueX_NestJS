import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "./product.entity";
import { UserEntity } from "./user.entity";

@Entity()
export class CartEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;

    @ManyToOne(() => UserEntity, user => user.cart_products)
    user: UserEntity;

    @ManyToOne(() => ProductEntity, product => product.cart_users)
    product: ProductEntity;
}