import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from 'src/interfaces/user.interface';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

    constructor(
        private userService: UserService
    ) {}


    // Register user
    @Post()
    register(@Body() user: User): Observable<User> {
        return this.userService.register(user).pipe(
            map((user: User) => user),
            catchError(err => throwError(err))
        )
    }

    // Login user
    @Post('login')
    login(@Body() user: User): Observable<Object> {
        return this.userService.login(user).pipe(
            map((jwt: string) => {
                return { token: jwt };
            })
        )
    }

    // Get all users
    @Get()
    findAll(): Observable<User[]> {
        return this.userService.findAll();
    }

    // Get user by id
    @Get(':id')
    findOne(@Param() params): Observable<User> {
        return this.userService.findOne(params.id)
    }

    // Update user by id
    @Put(':id')
    updateOne(@Param('id') id: string, @Body() user: User): Observable<any> {
        return this.userService.updateOne(Number(id), user);
    }

    // Delete user by id
    @Delete(':id')
    deleteOne(@Param('id') id: string): Observable<User> {
        return this.userService.deleteOne(Number(id));
    }

}
