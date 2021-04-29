import { Body, Controller, Get, Post, UseGuards, Query, Param, Put, Delete } from '@nestjs/common';
import { hasRoles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserIsUser } from 'src/auth/guards/user.guard';
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


    // Update cart
    // @UseGuards(JwtAuthGuard, UserIsUser)
    @Put(':id')
    updateCart(
        @Param('id') id: number,
        @Body() cart: Cart
    ) {
        return this.cartService.updateCart(id, cart);
    }


    // Delete from cart
    // @UseGuards(JwtAuthGuard, UserIsUser)
    @Delete(':id')
    deleteCart(@Param('id') id: number) {
        return this.cartService.deleteCart(id);
    }
}
