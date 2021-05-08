import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { ProductEntity } from 'src/entities/product.entity';
import { CategoryEntity } from 'src/entities/category.entity';
import { Product } from 'src/interfaces/product.interface';
import { addListener } from 'node:process';
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


    // Get most visited products
    findMostVisited() {
        return this.productRepository
            .createQueryBuilder("product")
            .orderBy('product.visits', 'DESC')
            .limit(4)
            .getMany();
    }


    // Get all products
    findAll(limit: number, search: string) {
        if (search) {
            return this.productRepository
                .createQueryBuilder("product")
                .leftJoinAndSelect("product.categories", "category")
                .leftJoinAndSelect("product.subcategories", "subcategory")
                .leftJoinAndSelect("product.comments", "comment")
                .leftJoinAndSelect("comment.user", "user")
                .where("LOWER(product.name) like LOWER(:name)", { name: `%${search}%` })
                .orWhere("LOWER(product.description) like LOWER(:description)", { description: `%${search}%`})
                .limit(limit)
                .getMany();
        } else {
            return this.productRepository
                .createQueryBuilder("product")
                .leftJoinAndSelect("product.categories", "category")
                .leftJoinAndSelect("product.subcategories", "subcategory")
                .leftJoinAndSelect("product.comments", "comment")
                .leftJoinAndSelect("comment.user", "user")
                .limit(limit)
                .getMany();
        }
        
    }


    // Get all products from a category
    findByCategory(categoryId: number, limit: number, search: string) {
        if (search) {
            return this.productRepository
                .createQueryBuilder("product")
                .leftJoinAndSelect("product.categories", "category")
                .leftJoinAndSelect("product.comments", "comment")
                .where("category.id = :id", { id: categoryId })
                .andWhere(new Brackets(qb => {
                    qb.where("LOWER(product.name) like LOWER(:name)", { name: `%${search}%` })
                    .orWhere("LOWER(product.description) like LOWER(:description)", { description: `%${search}%` })
                }))
                .limit(limit)
                .getMany();
        } else {
            return this.productRepository
                .createQueryBuilder("product")
                .leftJoinAndSelect("product.categories", "category")
                .leftJoinAndSelect("product.comments", "comment")
                .where("category.id = :id", { id: categoryId })
                .limit(limit)
                .getMany();
        }

    }


    // Get all products from a subcategory
    findBySubcategory(subcategoryId: number, limit: number, search: string) {
        if (search) {
            return this.productRepository
                .createQueryBuilder("product")
                .leftJoinAndSelect("product.subcategories", "subcategory")
                .leftJoinAndSelect("product.comments", "comment")
                .where("subcategory.id = :id", { id: subcategoryId })
                .andWhere(new Brackets(qb => {
                    qb.where("LOWER(product.name) like LOWER(:name)", { name: `%${search}%` })
                    .orWhere("LOWER(product.description) like LOWER(:description)", { description: `%${search}%` })
                }))
                .limit(limit)
                .getMany();
        } else {
            return this.productRepository
                .createQueryBuilder("product")
                .leftJoinAndSelect("product.subcategories", "subcategory")
                .leftJoinAndSelect("product.comments", "comment")
                .where("subcategory.id = :id", { id: subcategoryId })
                .limit(limit)
                .getMany();
        }
    }


    // Get one product
    findOne(slug: string) {
        return this.productRepository
            .createQueryBuilder("product")
            .leftJoinAndSelect("product.categories", "category")
            .leftJoinAndSelect("product.subcategories", "subcategory")
            .leftJoinAndSelect("product.ingredients", "ingredient")
            .leftJoinAndSelect("product.comments", "comment")
            .leftJoinAndSelect("comment.user", "user")
            .where("product.slug = :slug", { slug })
            .getOne().then((product) => {
                this.updateVisits(product.id, product);
                return product;
            });
    }


    // Update product's visits
    updateVisits(id: number, product: Product) {
        return this.productRepository
            .createQueryBuilder("product")
            .update(product)
            .set({ visits: product.visits + 1 })
            .where("id = :id", { id })
            .execute();
    }


    // Generate slug
    generateSlug(name: string) {
        return slugify(name);
    }


    // Update product
    updateOne(id: number, product: Product) {
        return this.productRepository.update(id, product);
    }


    // Delete product
    deleteOne(id: number) {
        return this.productRepository.delete(id);
    }
}
