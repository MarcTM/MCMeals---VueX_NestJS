import { Side } from "src/interfaces/ingredient.interface";
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { ProductEntity } from "./product.entity";

@Entity()
export class IngredientEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column({ type: 'enum', enum: Side })
    side: Side

    @ManyToMany(() => ProductEntity, product => product.ingredients)
    products: ProductEntity[];
}