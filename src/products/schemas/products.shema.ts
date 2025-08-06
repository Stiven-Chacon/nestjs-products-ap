import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  nombre: string;

  @Prop()
  descripcion?: string;

  @Prop({ required: true, min: 0 })
  precio: number;

  @Prop()
  categoria?: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
