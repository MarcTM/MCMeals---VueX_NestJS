import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable, of } from 'rxjs';
import { Category } from 'src/interfaces/category.interface';
import { Repository } from 'typeorm';
import { CategoryEntity } from 'src/entities/category.entity';
import { switchMap } from 'rxjs/operators';
const slugify = require('slugify');

@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>
    ) {}


    // Create category
    create(category: Category): Observable<Category> {
        return this.generateSlug(category.name).pipe(
            switchMap((slug: string) => {
                category.slug = slug;
                return from(this.categoryRepository.save(category));
            })
        )
    }


    // Get all categories
    findAll(): Observable<Category[]> {
        return from(this.categoryRepository.find());
    }


    // Update category
    updateOne(id: number, category: Category): Observable<any> {
        delete category.slug;
        
        return from(this.categoryRepository.update(id, category));
    }


    // Delete category
    deleteOne(id: number): Observable<any> {
        return from(this.categoryRepository.delete(id));
    }


    // Generate slug
    generateSlug(name: string): Observable<string> {
        return of(slugify(name));
    }
}
