import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SubcategoryEntity } from "./subcategory.entity";
import { CategoryEntity } from "./category.entity";
import { CartEntity } from "./cart.entity";
import { CommentEntity } from "./comment.entity";

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
    @JoinTable()
    categories: CategoryEntity[];

    @ManyToMany(() => SubcategoryEntity, subcategory => subcategory.products)
    @JoinTable()
    subcategories: SubcategoryEntity[];

    @OneToMany(() => CartEntity, cart => cart.product)
    cart_users: CartEntity[];

    @OneToMany(() => CommentEntity, comment => comment.product)
    comments: CommentEntity[];
}