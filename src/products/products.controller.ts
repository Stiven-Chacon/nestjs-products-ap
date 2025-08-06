import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Product } from './schemas/products.shema';
@ApiTags('Products')
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
    @ApiOperation({ summary: 'Get all products' })
    @ApiResponse({ status: 200, description: 'List of all products', type: [Product] })
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
    @ApiOperation({ summary: 'Create a new product' })
    @ApiBody({ type: CreateProductDto })
    @ApiResponse({ status: 201, description: 'Product created successfully', type: Product })
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
    @ApiOperation({ summary: 'Update a product by ID' })
    @ApiParam({ name: 'id', required: true, description: 'Product ID' })
    @ApiBody({ type: UpdateProductDto })
    @ApiResponse({ status: 200, description: 'Product updated successfully', type: Product })
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
    @ApiOperation({ summary: 'Delete a product by ID' })
    @ApiParam({ name: 'id', required: true, description: 'Product ID' })
    @ApiResponse({ status: 200, description: 'Product deleted successfully' })
    async remove(@Param('id') id: string) {
        return this.productService.remove(id);
    }

}