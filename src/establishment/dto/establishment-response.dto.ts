import { Expose, Transform } from "class-transformer";
import { IsNotEmpty, IsOptional } from "class-validator";
import { DateBaseDto } from "../../responseDto/date-base.dto";

export class EstablishmentResponseDto extends DateBaseDto {
  @Expose()
  @IsNotEmpty()
  id!: string;

  @Expose()
  @IsNotEmpty()
  name!: string;

  @Expose()
  @IsOptional()
  address?: string;

  @Expose()
  @IsOptional()
  street?: string;

  @Expose()
  @IsOptional()
  number?: string;

  @Expose()
  @IsOptional()
  complement?: string;

  @Expose()
  @IsOptional()
  neighborhood?: string;

  @Expose()
  @IsOptional()
  city?: string;

  @Expose()
  @IsOptional()
  state?: string;

  @Expose()
  @IsOptional()
  country?: string;

  @Expose()
  @IsOptional()
  zipCode?: string;

  @Expose()
  @IsOptional()
  photo?: string;

  @Expose()
  @IsNotEmpty()
  @Transform(({ obj }) => obj.owner?.id)
  ownerId!: string;

  @Expose()
  @IsOptional()
  @Transform(({ obj }) => obj.status?.id)
  statusId?: number;

  @Expose()
  @IsOptional()
  @Transform(({ obj }) => obj.status?.name)
  statusName?: string;
}
