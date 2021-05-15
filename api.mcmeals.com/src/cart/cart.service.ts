import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartEntity } from 'src/entities/cart.entity';
import { Cart } from 'src/interfaces/cart.interface';
import { Product } from 'src/interfaces/product.interface';
import { ProductEntity } from 'src/entities/product.entity';
import { ProductService } from '../product/product.service';
const slugify = require('slugify');


@Injectable()
export class CartService {
    constructor(
        private productService: ProductService,
        @InjectRepository(CartEntity) private readonly cartRepository: Repository<CartEntity>,
        // @InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>,
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
                    return true;
                }
                return false;
            });
    }


    // Create custom meal and add to cart
    addCustom(custom: any) {
        return this.productService.create(custom.product)
        .then((result) => {
            const cart: Cart = {
                user: custom.user,
                product: result,
                quantity: custom.quantity
            }
            this.add(cart);
        })
    }


    // Get user's cart products
    findByUser(userId: number) {
        return this.cartRepository
            .createQueryBuilder("cart")
            .leftJoinAndSelect("cart.user", "user")
            .leftJoinAndSelect("cart.product", "product")
            .leftJoinAndSelect("product.ingredients", "ingredient")
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
    deleteCart(id: number, custom = false) {
        return this.cartRepository.delete(id);
    }
}
