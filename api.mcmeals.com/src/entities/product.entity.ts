import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SubcategoryEntity } from "./subcategory.entity";
import { CategoryEntity } from "./category.entity";
import { CartEntity } from "./cart.entity";
import { CommentEntity } from "./comment.entity";
import { IngredientEntity } from "./ingredient.entity";

@Entity()
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: true })
    slug: string;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    image: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    weight: number;

    @Column()
    price: number;

    @Column({ nullable: true })
    type: string;

    @Column()
    energy: number;

    @Column()
    fats: number;

    @Column({ nullable: true })
    saturated: number;

    @Column()
    carbohydrates: number;

    @Column({ nullable: true })
    sugars: number;

    @Column()
    fiber: number;

    @Column()
    proteins: number;

    @Column({ nullable: true })
    salt: number;

    @Column({ default: 0 })
    visits: number;

    @ManyToMany(() => IngredientEntity, ingredient => ingredient.products)
    @JoinTable()
    ingredients: IngredientEntity[];

    @ManyToMany(() => CategoryEntity, category => category.products)
    @JoinTable()
    categories: CategoryEntity[];

    @ManyToMany(() => SubcategoryEntity, subcategory => subcategory.products)
    @JoinTable()
    subcategories: SubcategoryEntity[];

    @OneToMany(() => CartEntity, cart => cart.product)
    cart_users: CartEntity[];

    @OneToMany(() => CommentEntity, comment => comment.product, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    comments: CommentEntity[];
}