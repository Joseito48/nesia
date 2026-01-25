import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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