import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dtos/create-product.dto';

@Controller('products')
export class ProductsController {
    constructor(private productService: ProductsService){}

    @Post('create')
    async createProduct(@Body(new ValidationPipe()) dto: CreateProductDto){
        return this.productService.create(dto);
    }

}