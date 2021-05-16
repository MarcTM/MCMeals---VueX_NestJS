import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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

    @Column({ nullable: true })
    image: string;

    @ManyToOne(() => CategoryEntity, category => category.subcategories, { nullable: true })
    category: CategoryEntity;

    @ManyToMany(() => ProductEntity, product => product.subcategories)
    products: ProductEntity[];

    @OneToMany(() => SubcategoryEntity, subcategory => subcategory.subcategory, { nullable: true })
    subcategories: SubcategoryEntity[];

    @ManyToOne(() => SubcategoryEntity, subcategory => subcategory.subcategories, { nullable: true })
    subcategory: SubcategoryEntity;
}