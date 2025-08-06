import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/products.shema';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>,
    ) { }

    /**
     * Creates a new product in the database.
     *
     * @param products The DTO containing product data to be created.
     * @returns The newly created product document.
     */

    async create(products: CreateProductDto) {
        const createdProduct = new this.productModel(products);
        return createdProduct.save()
    }

    /**
     * Updates an existing product by its ID.
     *
     * @param id The ID of the product to update.
     * @param updateProductDto The DTO containing the updated product data.
     * @returns The updated product document.
     * @throws NotFoundException if the product does not exist.
     */
    async update(id: string, updateProductDto: UpdateProductDto) {
        const updatedProduct = await this.productModel.findByIdAndUpdate(
            id,
            { $set: updateProductDto },
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            throw new NotFoundException(`Producto con id ${id} no encontrado`);
        }

        return updatedProduct;
    }

    /**
     * Retrieves all products from the database.
     *
     * @returns An array of product documents.
     */
    async findAll() {
        return this.productModel.find().exec();
    }
    
    /**
     * Deletes a product by its ID.
     *
     * @param id The ID of the product to delete.
     * @returns A message confirming deletion and the deleted product.
     * @throws NotFoundException if the product does not exist.
     */

    async remove(id: string) {
        const deletedProduct = await this.productModel.findByIdAndDelete(id);

        if (!deletedProduct) {
            throw new NotFoundException(`Producto con id ${id} no encontrado`);
        }

        return {
            message: `Producto con id ${id} eliminado correctamente`,
            deletedProduct,
        };
    }

}
