import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdateProductDto {
  @ApiPropertyOptional({ example: 'Laptop', description: 'Nombre del producto' })
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiPropertyOptional({ example: 'Computador portátil de última generación' })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiPropertyOptional({ example: 1200, description: 'Precio del producto (debe ser mayor a 0)' })
  @IsOptional()
  @IsPositive()
  precio?: number;

  @ApiPropertyOptional({ example: 'Electrónica' })
  @IsOptional()
  @IsString()
  categoria?: string;
}
