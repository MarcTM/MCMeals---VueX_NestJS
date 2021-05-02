import { UserRole } from "src/interfaces/user.interface";
import { BeforeInsert, OneToMany, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CartEntity } from "./cart.entity";
import { CommentEntity } from "./comment.entity";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column({ unique: true, nullable: true })
    email: string;

    @Column({ nullable: true })
    password: string;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
    role: UserRole;

    @OneToMany(() => CartEntity, cart => cart.user)
    cart_products: CartEntity[];

    @OneToMany(() => CommentEntity, comment => comment.user)
    comments: CommentEntity[];

    @BeforeInsert()
    emailToLowerCase() {
        this.email = this.email.toLowerCase();
    }
}