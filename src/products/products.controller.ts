import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';

@Controller('products')
export class ProductsController {
    constructor(private productService: ProductsService) { }

    /**
     * GET /products
     *
     * Retrieves all products from the database.
     *
     * @returns An array of product objects.
    */
    @Get()
    async findAll() {
        return this.productService.findAll();
    }

    /**
     * POST /products/create
     *
     * Creates a new product using the data provided in the request body.
     *
     * @param dto The CreateProductDto containing product details.
     * @returns The newly created product object.
     */
    @Post('create')
    async createProduct(@Body(new ValidationPipe()) dto: CreateProductDto) {
        return this.productService.create(dto);
    }

    /**
     * PUT /products/update/:id
     *
     * Updates an existing product by its ID using the data provided in the request body.
     *
     * @param id The ID of the product to update.
     * @param dto The UpdateProductDto with fields to be updated.
     * @returns The updated product object.
     */
    @Put('update/:id')
    async update(@Param('id') id: string, @Body(new ValidationPipe()) dto: UpdateProductDto) {
        return this.productService.update(id, dto);
    }
    
    /**
     * DELETE /products/delete/:id
     *
     * Deletes a product by its ID.
     *
     * @param id The ID of the product to delete.
     * @returns A confirmation message or the deleted product object.
     */
    @Delete('delete/:id')
    async remove(@Param('id') id: string) {
        return this.productService.remove(id);
    }

}