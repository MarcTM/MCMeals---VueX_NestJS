import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { hasRoles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { User, UserRole } from 'src/interfaces/user.interface';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

    constructor(
        private userService: UserService
    ) {}


    // User Register
    @Post()
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


    // Get all users
    // @hasRoles(UserRole.ADMIN)
    // @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    index(@Query('page') page: number = 1, @Query('limit') limit: number = 2): Observable<Pagination<User>> {
        limit = limit > 15 ? 15 : limit;
        return this.userService.paginate({ page: Number(page), limit: Number(limit), route: 'http://localhost:3000/users' });
    }
    // findAll(): Observable<User[]> {
    //     return this.userService.findAll();
    // }


    // Get user by id
    @hasRoles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id')
    findOne(@Param() params): Observable<User> {
        return this.userService.findOne(params.id)
    }


    // Update user by id
    @hasRoles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id')
    updateOne(@Param('id') id: string, @Body() user: User): Observable<any> {
        return this.userService.updateOne(Number(id), user);
    }


    // Delete user by id
    @hasRoles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    deleteOne(@Param('id') id: string): Observable<User> {
        return this.userService.deleteOne(Number(id));
    }


    // Update user role
    @hasRoles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id/role')
    updateUserRole(@Param('id') id: string, @Body() user: User): Observable<User> {
        return this.userService.updateUserRole(Number(id), user);
    }
}
