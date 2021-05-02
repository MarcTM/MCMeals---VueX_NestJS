import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartEntity } from 'src/entities/cart.entity';
import { Cart } from 'src/interfaces/cart.interface';
const slugify = require('slugify');


@Injectable()
export class CartService {
    constructor(
        @InjectRepository(CartEntity) private readonly cartRepository: Repository<CartEntity>,
    ) {}


    // Add to cart
    async add(cart: Cart) {
        return this.cartRepository
            .createQueryBuilder("cart")
            .leftJoinAndSelect("cart.user", "user")
            .leftJoinAndSelect("cart.product", "product")
            .andWhere("product.id = " + cart.product.id)
            .andWhere("user.id = " + cart.user.id)
            .getOne()
            .then((response) => {
                if (!response) {
                    this.cartRepository.save(cart);
                }
                return;
            })
    }


    // Get user's cart products
    findByUser(userId: number) {
        return this.cartRepository
            .createQueryBuilder("cart")
            .leftJoinAndSelect("cart.user", "user")
            .leftJoinAndSelect("cart.product", "product")
            .where("user.id = :id", { id: userId })
            .getMany();
    }


    // Update cart
    updateCart(id: number, cart: Cart) {
        if (cart.quantity === 0) {
            return this.cartRepository.delete(id);
        } else {
            return this.cartRepository.update(id, cart);
        }
    }


    // Delete from cart
    deleteCart(id: number) {
        return this.cartRepository.delete(id);
    }
}
