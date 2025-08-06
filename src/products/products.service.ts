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

    async create(products: CreateProductDto) {
        const createdProduct = new this.productModel(products);
        return createdProduct.save()
    }

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


    async findAll() {
        return this.productModel.find().exec();
    }

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
