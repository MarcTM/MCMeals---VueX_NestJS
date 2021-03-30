import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { hasRoles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserIsUser } from 'src/auth/guards/user.guard';
import { User, UserRole } from 'src/interfaces/user.interface';
import { UserService } from './user.service';

@Controller('auth')
export class UserController {

    constructor(
        private userService: UserService
    ) {}


    // User Register
    @Post('register')
    register(@Body() user: User): Observable<User> {
        return this.userService.register(user).pipe(
            map((user: User) => user),
            catchError(err => throwError(err))
        )
    }


    // User Login
    @Post('login')
    login(@Body() user: User): Observable<Object> {
        return this.userService.login(user).pipe(
            map((jwt: string) => {
                return { token: jwt };
            })
        )
    }


    // Get all users by pagination and filtered
    // @hasRoles(UserRole.ADMIN)
    // @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('users')
    index(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 4,
        @Query('email') email: string
    ): Observable<Pagination<User>> {
        limit = limit > 15 ? 15 : limit;

        if(email === null || email === undefined) {
            return this.userService.paginate({ page: Number(page), limit: Number(limit), route: 'http://localhost:3000/users' });
        } else {
            if(page === 1) { page = 0 };
            return this.userService.paginateFilter(
                { page: Number(page), limit: Number(limit), route: 'http://localhost:3000/users' },
                { email: email.toLowerCase() }
            );
        }

    }


    // Get user by id
    @Get('users/:id')
    // @hasRoles(UserRole.ADMIN)
    // @UseGuards(JwtAuthGuard, RolesGuard)
    @UseGuards(JwtAuthGuard, UserIsUser)
    findOne(@Param() params): Observable<User> {
        return this.userService.findOne(params.id)
    }


    // Update user by id
    // @hasRoles(UserRole.ADMIN)
    // @UseGuards(JwtAuthGuard, RolesGuard)
    @UseGuards(JwtAuthGuard, UserIsUser)
    @Put('users/:id')
    updateOne(
        @Param('id') id: string,
        @Body() user: User
    ): Observable<any> {
        return this.userService.updateOne(Number(id), user);
    }


    // Delete user by id
    @hasRoles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete('users/:id')
    deleteOne(@Param('id') id: string): Observable<User> {
        return this.userService.deleteOne(Number(id));
    }


    // Update user role
    @hasRoles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put('users/:id/role')
    updateUserRole(
        @Param('id') id: string,
        @Body() user: User
    ): Observable<User> {
        return this.userService.updateUserRole(Number(id), user);
    }
}
