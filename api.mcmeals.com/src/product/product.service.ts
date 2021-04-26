import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from 'src/entities/product.entity';
import { CategoryEntity } from 'src/entities/category.entity';
import { Product } from 'src/interfaces/product.interface';
const slugify = require('slugify');


@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>,
    ) {}


    // Create product
    create(product: Product) {
        const slug = this.generateSlug(product.name)
        product.slug = slug;
        return this.productRepository.save(product);
    }


    // Get all products
    findAll() {
        return this.productRepository.find({
            relations: ['categories', 'subcategories', 'comments']
        });
    }


    // Get all products from a category
    findByCategory(categoryId: number) {
        return this.productRepository
            .createQueryBuilder("product")
            .leftJoinAndSelect("product.categories", "category")
            .leftJoinAndSelect("product.comments", "comment")
            .where("category.id = :id", { id: categoryId })
            .getMany();
    }


    // Get all products from a subcategory
    findBySubcategory(subcategoryId: number) {
        return this.productRepository
            .createQueryBuilder("product")
            .leftJoinAndSelect("product.subcategories", "subcategory")
            .leftJoinAndSelect("product.comments", "comment")
            .where("subcategory.id = :id", { id: subcategoryId })
            .getMany();
    }


    // Get one product
    findOne(slug: string) {
        return this.productRepository.findOne(
            { slug },
            { relations: ['categories', 'subcategories', 'comments'] }
        );
    }


    // Generate slug
    generateSlug(name: string) {
        return slugify(name);
    }
}
