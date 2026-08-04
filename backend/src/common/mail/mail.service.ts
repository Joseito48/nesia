import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.ionos.es',
      port: Number(process.env.SMTP_PORT || 465),
      secure: Number(process.env.SMTP_PORT || 465) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendReservationEmail(reserva: any) {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      this.logger.warn('SMTP no configurado. Se omite el envío de correo.');
      return false;
    }

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.NOTIFICATION_EMAIL || process.env.SMTP_USER,
      subject: `Nueva reserva en Nesia Detail Car - ${reserva.nombreCliente}`,
      html: `
        <h2>¡Nueva reserva recibida!</h2>
        <p><strong>Cliente:</strong> ${reserva.nombreCliente}</p>
        <p><strong>Email:</strong> ${reserva.email}</p>
        <p><strong>Teléfono:</strong> ${reserva.telefono}</p>
        <p><strong>Servicio:</strong> ${reserva.servicioId}</p>
        <p><strong>Fecha:</strong> ${reserva.fecha}</p>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      this.logger.log(`Correo de reserva enviado a ${mailOptions.to}`);
      return true;
    } catch (error) {
      this.logger.error('No se pudo enviar el correo de reserva', error instanceof Error ? error.stack : error);
      return false;
    }
  }
}
