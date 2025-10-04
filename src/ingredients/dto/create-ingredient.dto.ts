import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateIngredientDto {
  @IsNumber()
  sku: number;

  @IsNumber()
  price: number;

  @IsString()
  @IsOptional()
  description?: string;
}
