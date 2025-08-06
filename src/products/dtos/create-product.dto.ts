import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Laptop', description: 'Nombre del producto' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: 'Computador portátil de última generación', required: false })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiProperty({ example: 1200, description: 'Precio del producto (debe ser mayor a 0)' })
  @IsPositive()
  precio: number;

  @ApiProperty({ example: 'Electrónica', required: false })
  @IsOptional()
  @IsString()
  categoria?: string;
}
