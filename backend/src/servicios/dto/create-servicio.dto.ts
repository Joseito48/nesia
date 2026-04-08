import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateServicioDto {
  @IsString({ message: 'El título debe ser un texto' })
  @IsNotEmpty({ message: 'El título es obligatorio' })
  title: string;

  @IsString({ message: 'La descripción debe ser un texto' })
  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  description: string;

  @IsNumber({}, { message: 'El precio debe ser un número' })
  @IsNotEmpty({ message: 'El precio es obligatorio' })
  price: number;

  @IsString()
  @IsOptional() // La imagen es opcional al crear, se puede subir después
  image?: string;
}