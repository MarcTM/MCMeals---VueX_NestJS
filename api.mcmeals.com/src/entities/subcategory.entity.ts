import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CategoryEntity } from "./category.entity";

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

    @ManyToOne(type => CategoryEntity, category => category.subcategories)
    category: CategoryEntity
}