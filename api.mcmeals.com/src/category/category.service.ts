import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/interfaces/category.interface';
import { Repository } from 'typeorm';
import { CategoryEntity } from 'src/entities/category.entity';
const slugify = require('slugify');

@Injectable()
export class CategoryService {

    constructor(@InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>) {}


    // Create category
    create(category: Category) {
        const slug = this.generateSlug(category.name);
        category.slug = slug;
        return this.categoryRepository.save(category);
    }


    // Get all categories
    findAll() {
        return this.categoryRepository.find();
    }


    // Get category by slug
    findOne(slug: string) {
        return this.categoryRepository.findOne({ slug });
    }


    // Update category
    updateOne(id: number, category: Category) {
        delete category.slug;
        return this.categoryRepository.update(id, category);
    }


    // Delete category
    deleteOne(id: number) {
        return this.categoryRepository.delete(id);
    }


    // Generate slug
    generateSlug(name: string) {
        return slugify(name);
    }
}
