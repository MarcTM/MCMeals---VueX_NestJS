import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable, of } from 'rxjs';
import { Repository } from 'typeorm';
import { Subcategory } from 'src/interfaces/subcategory.interface';
import { SubcategoryEntity } from 'src/entities/subcategory.entity';
import { switchMap } from 'rxjs/operators';
const slugify = require('slugify');


@Injectable()
export class SubcategoryService {
    constructor(
        @InjectRepository(SubcategoryEntity) private readonly subcategoryRepository: Repository<SubcategoryEntity>,
    ) {}


    // Create subcategory
    create(subcategory: Subcategory): Observable<Subcategory> {
        return this.generateSlug(subcategory.name).pipe(
            switchMap((slug: string) => {
                subcategory.slug = slug;
                return from(this.subcategoryRepository.save(subcategory));
            })
        )
    }


    // Get all subcategories
    findAll(): Observable<Subcategory[]> {
        return from(this.subcategoryRepository.find({
            relations: ['category']
        }));
    }


    // Get all subcategories from a category
    findByCategory(categoryId: number): Observable<Subcategory[]> {
        return from(this.subcategoryRepository.find({
            where: {
                category: categoryId
            },
            relations: ['category']
        }))
    }


    // Get one subcategory
    findOne(id: number): Observable<Subcategory> {
        return from(this.subcategoryRepository.findOne({ id }, { relations: ['category'] }));
    }


    // Generate slug
    generateSlug(name: string): Observable<string> {
        return of(slugify(name));
    }
}
