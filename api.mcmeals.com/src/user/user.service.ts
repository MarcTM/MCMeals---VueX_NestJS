import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    register(user: User) {
        // Hash password and return the user
        return this.authService.hashPassword(user.password)
        .then((passwordHash) => {
            const newUser = new UserEntity();
            newUser.name = user.name;
            newUser.surname = user.surname;
            newUser.email = user.email;
            newUser.password = passwordHash;
            newUser.role = UserRole.USER;

            return this.userRepository.save(newUser)
            .then((user) => {
                const {password, ...result} = user;
                return result;
            })
            .catch((error) => {
                return error
            })
        })
        .catch((error) => {
            return error;
        })
    }


    // User Login
    login(user: User) {
        // Validate the user and return him with his token
        return this.validateUser(user.email, user.password)
        .then((user) => {
            if (user) {
                return this.authService.generateJWT(user)
                .then((token) => {
                    return {
                        user,
                        token
                    };
                })
            } else {
                return {
                    user: undefined,
                    token: undefined
                }
            }
            
        })
        .catch((error) => {
            return error;
        })
    }


    // Get all users
    findAll() {
        return this.userRepository.find()
        .then((users) => {
            users.forEach(user => {
                delete user.password
            });
            return users;
        })
    }

    
    // Paginate users
    paginate(options: IPaginationOptions) {
        return paginate<User>(this.userRepository, options)
        .then((usersPageable) => {
            usersPageable.items.forEach(function(v) { delete v.password });
            return usersPageable;
        })
    }


    // Paginate users filtered by email
    paginateFilter(options: IPaginationOptions, user: User) {
        return this.userRepository.findAndCount({
            skip: +options.page * +options.limit || 0,
            take: +options.limit || 4,
            order: { id: "ASC" },
            select: [ 'id', 'name', 'surname', 'email', 'role' ],
            where: [
                { email: Like(`%${user.email}%`) }
            ]
        })
        .then(([users, totalUsers]) => {
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
        .catch((error) => {
            return error;
        })
    }


    // Get user by id
    findOne(id: number) {
        return this.userRepository.findOne({ id })
        .then((user) => {
            const {password, ...result} = user;
            return result;
        })
    }


    // Update user
    updateOne(id: number, user: User) {
        delete user.email;
        delete user.password;
        delete user.role;
        
        return this.userRepository.update(id, user);
    }


    // Update user role
    updateUserRole(id: number, user: User) {
        return this.userRepository.update(id, user);
    }


    // Delete user
    deleteOne(id: number) {
        return this.userRepository.delete(id);
    }


    // Validate that user exists
    validateUser(email: string, password: string) {
        return this.findByEmail(email)
        .then((user) => {
            return this.authService.comparePasswords(password, user.password)
            .then((match) => {
                if (match) {
                    console.log("match");
                    const {password, ...result} = user;
                    return result;
                } else {
                    return false;
                }
            })
        })
    }

    
    // Find user by email
    findByEmail(email: string) {
        return this.userRepository.findOne({ email });
    }
}
