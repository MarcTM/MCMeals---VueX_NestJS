import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CategoryEntity } from "./category.entity";
import { ProductEntity } from "./product.entity";

@Entity()
export class SubcategoryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    slug: string;

    @Column({ unique: true })
    name: string;

    @Column()
    image: string;

    @ManyToOne(() => CategoryEntity, category => category.subcategories)
    category: CategoryEntity;

    @ManyToMany(() => ProductEntity, product => product.subcategories)
    products: ProductEntity[];
}