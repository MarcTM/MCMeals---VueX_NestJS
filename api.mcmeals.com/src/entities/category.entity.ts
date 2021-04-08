import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "./product.entity";
import { SubcategoryEntity } from "./subcategory.entity";

@Entity()
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    slug: string;

    @Column({ unique: true })
    name: string;

    @Column()
    image: string;

    @OneToMany(() => SubcategoryEntity, subcategory => subcategory.category)
    subcategories: SubcategoryEntity[];

    @ManyToMany(() => ProductEntity, product => product.categories)
    products: ProductEntity[];
}