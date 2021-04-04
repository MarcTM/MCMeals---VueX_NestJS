import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { SubcategoryEntity } from "./subcategory.entity";
import { CategoryEntity } from "./category.entity";

@Entity()
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    slug: string;

    @Column()
    name: string;

    @Column()
    image: string;

    @Column()
    description: string;

    @Column()
    weight: number;

    @Column()
    price: number;

    @Column()
    type: string;

    @Column()
    energy: number;

    @Column()
    fats: number;

    @Column()
    saturated: number;

    @Column()
    carbohydrates: number;

    @Column()
    sugars: number;

    @Column()
    fiber: number;

    @Column()
    proteins: number;

    @Column()
    salt: number;

    @ManyToMany(() => CategoryEntity, category => category.products)
    categories: CategoryEntity[];

    @ManyToMany(() => SubcategoryEntity, subcategory => subcategory.products)
    subcategories: SubcategoryEntity[];
}