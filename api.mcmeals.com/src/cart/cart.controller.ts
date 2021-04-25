import { Body, Controller, Get, Post, UseGuards, Query, Param } from '@nestjs/common';
import { hasRoles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Cart } from 'src/interfaces/cart.interface';
import { UserRole } from 'src/interfaces/user.interface';
import { CartService } from './cart.service';


@Controller('cart')
export class CartController {
    constructor(
        private cartService: CartService
    ) {}


    // Add to cart
    // @hasRoles(UserRole.ADMIN)
    // @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    add(@Body() cart: Cart) {
        return this.cartService.add(cart);
    }


    // Get user's cart products
    @Get(':userId')
    findByUser(@Param('userId') userId: number) {
        return this.cartService.findByUser(userId);
    }
}
