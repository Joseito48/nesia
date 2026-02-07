import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
//  Definición del esquema de Mongoose para la entidad Servicio, aquí se definen las propiedades del servicio y sus tipos, además de marcar cuáles son obligatorias
@Schema()
export class Servicio extends Document {
  @Prop({ required: true }) // El título es obligatorio
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop()
  image: string; // Guardaremos la URL de la imagen
}

export const ServicioSchema = SchemaFactory.createForClass(Servicio);