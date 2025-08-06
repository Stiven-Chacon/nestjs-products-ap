import { Body, Controller, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';

@Controller('products')
export class ProductsController {
    constructor(private productService: ProductsService) { }
    @Get()
    async findAll() {
    return this.productService.findAll();
    }


    @Post('create')
    async createProduct(@Body(new ValidationPipe()) dto: CreateProductDto) {
        return this.productService.create(dto);
    }

    @Put('update/:id')
    async update(@Param('id') id: string, @Body(new ValidationPipe()) dto: UpdateProductDto) {
        return this.productService.update(id, dto);
    }

}