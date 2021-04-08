import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from 'src/entities/product.entity';
import { Product } from 'src/interfaces/product.interface';
const slugify = require('slugify');


@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>,
    ) {}


    // Create product
    create(product: Product) {
        return this.generateSlug(product.name)
        .then((slug) => {
            product.slug = slug;
            return this.productRepository.save(product);
        })
    }


    // Get all products
    findAll() {
        return this.productRepository.find({
            relations: ['categories', 'subcategories']
        });
    }


    // // Get all products from a category
    // findByCategory(categoryId: number) {
    //     return this.productRepository.find({
    //         where: {
    //             categories: {
    //                 category: categoryId
    //             }
    //         },
    //         relations: ['categories', 'subcategories']
    //     })
    // }


    // // Get all products from a subcategory
    // findBySubcategory(subcategoryId: number) {
    //     return this.productRepository.find({
    //         where: {
    //             subcategories: subcategoryId
    //         },
    //         relations: ['categories', 'subcategories']
    //     })
    // }


    // Get one product
    findOne(id: number) {
        return this.productRepository.findOne(
            { id },
            { relations: ['categories', 'subcategories'] }
        );
    }


    // Generate slug
    generateSlug(name: string) {
        return slugify(name);
    }
}
