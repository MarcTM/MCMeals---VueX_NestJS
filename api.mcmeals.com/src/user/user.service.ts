import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/auth/auth.service';
import { UserEntity } from 'src/entities/user.entity';
import { User, UserRole } from 'src/interfaces/user.interface';
import { Like, Repository } from 'typeorm';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        private authService: AuthService
    ) {}


    // User Register
    register(user: User): Observable<User> {
        // Hash password
        return this.authService.hashPassword(user.password).pipe(
            switchMap((passwordHash: string) => {
                const newUser = new UserEntity();
                newUser.name = user.name;
                newUser.surname = user.surname;
                newUser.email = user.email;
                newUser.password = passwordHash;
                newUser.role = UserRole.USER;

                return from(this.userRepository.save(newUser)).pipe(
                    map((user: User) => {
                        // Return everything but the hashed password
                        const {password, ...result} = user;
                        return result;
                    }),
                    catchError(err => throwError(err))
                );
            })
        )
    }


    // User Login
    login(user: User): Observable<string> {
        // Validate that user exists
        return this.validateUser(user.email, user.password).pipe(
            switchMap((user: User) => {
                if(user) {
                    return this.authService.generateJWT(user).pipe(
                        map((jwt) => jwt)
                    )
                } else {
                    return "Invalid credentials";
                }
            })
        )
    }


    // Get all users
    findAll(): Observable<User[]> {
        return from(this.userRepository.find()).pipe(
            map((users: User[]) => {
                users.forEach(user => {
                    delete user.password
                });
                return users;
            })
        );
    }

    
    // Paginate users
    paginate(options: IPaginationOptions): Observable<Pagination<User>> {
        return from(paginate<User>(this.userRepository, options)).pipe(
            map((usersPageable: Pagination<User>) => {
                usersPageable.items.forEach(function(v) { delete v.password });

                return usersPageable;
            })
        )
    }


    // Paginate users with filter
    paginateFilter(options: IPaginationOptions, user: User): Observable<Pagination<User>> {
        return from(this.userRepository.findAndCount({
            skip: +options.page * +options.limit || 0,
            take: +options.limit || 4,
            order: { id: "ASC" },
            select: [ 'id', 'name', 'surname', 'email', 'role' ],
            where: [
                { email: Like(`%${user.email}%`) }
            ]
        })).pipe(
            map(([users, totalUsers]) => {
                const usersPageable: Pagination<User> = {
                    items: users,
                    links: {
                        first: options.route + `?limit=${options.limit}&page=0`,
                        previous: (+options.page - 1 < 0) ? '' : options.route + `?limit=${options.limit}&page=${+options.page - 1}`,
                        next: (+options.page + 1 > (Math.floor((totalUsers - 1) / +options.limit))) ? '' : options.route + `?limit=${options.limit}&page=${+options.page + 1}`,
                        last: options.route + `?limit=${options.limit}&page=${Math.floor((totalUsers - 1) / +options.limit)}`
                    },
                    meta: {
                        currentPage: +options.page,
                        itemCount: users.length,
                        itemsPerPage: +options.limit,
                        totalItems: totalUsers,
                        totalPages: Math.ceil(totalUsers / +options.limit)
                    }
                };
                return usersPageable;
            })
        )
    }


    // Get user by id
    findOne(id: number): Observable<User> {
        return from(this.userRepository.findOne({ id })).pipe(
            map((user: User) => {
                const {password, ...result} = user;
                return result;
            })
        );
    }


    // Update user
    updateOne(id: number, user: User): Observable<any> {
        delete user.email;
        delete user.password;
        delete user.role;
        
        return from(this.userRepository.update(id, user));
    }


    // Update user role
    updateUserRole(id: number, user: User): Observable<any> {
        return from(this.userRepository.update(id, user));
    }


    // Delete user
    deleteOne(id: number): Observable<any> {
        return from(this.userRepository.delete(id));
    }


    // Validate that user exists
    validateUser(email: string, password: string): Observable<User> {
        return this.findByEmail(email).pipe(
            switchMap((user: User) => this.authService.comparePasswords(password, user.password).pipe(
                map((match: boolean) => {
                    if(match) {
                        const {password, ...result} = user;
                        return result;
                    } else {
                        throw Error;
                    }
                })
            ))
        )
    }

    
    // Find user by email
    findByEmail(email: string): Observable<User> {
        return from(this.userRepository.findOne({ email }))
    }
}
