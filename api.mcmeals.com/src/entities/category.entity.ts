import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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

    @OneToMany(type => SubcategoryEntity, subcategory => subcategory.category)
    subcategories: SubcategoryEntity[]
}