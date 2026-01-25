import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Reserva extends Document {
  @Prop({ required: true })
  nombreCliente: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  telefono: string;

  @Prop({ required: true })
  servicioId: string; // El ID del servicio que eligió

  @Prop({ required: true })
  fecha: string;
}

export const ReservaSchema = SchemaFactory.createForClass(Reserva);