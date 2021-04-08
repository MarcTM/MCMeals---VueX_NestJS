import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subcategory } from 'src/interfaces/subcategory.interface';
import { SubcategoryEntity } from 'src/entities/subcategory.entity';
const slugify = require('slugify');


@Injectable()
export class SubcategoryService {
    constructor(
        @InjectRepository(SubcategoryEntity) private readonly subcategoryRepository: Repository<SubcategoryEntity>,
    ) {}


    // Create subcategory
    create(subcategory: Subcategory) {
        return this.generateSlug(subcategory.name)
        .then((slug) => {
            subcategory.slug = slug;
            return this.subcategoryRepository.save(subcategory);
        })
    }


    // Get all subcategories
    findAll() {
        return this.subcategoryRepository.find({
            relations: ['category']
        });
    }


    // Get all subcategories from a category
    findByCategory(categoryId: number) {
        return this.subcategoryRepository.find({
            where: {
                category: categoryId
            },
            relations: ['category']
        });
    }


    // Get one subcategory
    findOne(id: number) {
        return this.subcategoryRepository.findOne({ id }, { relations: ['category'] });
    }


    // Generate slug
    generateSlug(name: string) {
        return slugify(name);
    }
}
