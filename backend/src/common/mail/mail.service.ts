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

    const businessEmail = process.env.NOTIFICATION_EMAIL || process.env.SMTP_USER;
    const customerEmail = reserva?.email;
    const whatsappNumber = process.env.WHATSAPP_NUMBER || '34600000000';
    const whatsappMessage = encodeURIComponent('Hola, he realizado una reserva en Nesia Detail Car.');
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
    const servicioTexto = reserva?.nombreServicio || reserva?.servicioId || 'Servicio solicitado';

    const businessTemplate = `
      <div style="font-family: Arial, sans-serif; background:#f6f8fb; padding:24px;">
        <div style="max-width:680px; margin:0 auto; background:#ffffff; border-radius:18px; overflow:hidden; border:1px solid #e5e7eb;">
          <div style="background: linear-gradient(135deg, #0f172a, #2563eb); padding:28px 32px; color:#ffffff;">
            <h1 style="margin:0; font-size:24px;">Nueva reserva recibida</h1>
            <p style="margin:8px 0 0; opacity:0.95;">Tienes una nueva solicitud de cliente pendiente de revisión.</p>
          </div>
          <div style="padding:28px 32px; color:#111827;">
            <p style="margin:0 0 16px; font-size:16px;"><strong>Datos del cliente</strong></p>
            <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:16px; margin-bottom:16px;">
              <p style="margin:4px 0;"><strong>Cliente:</strong> ${reserva.nombreCliente}</p>
              <p style="margin:4px 0;"><strong>Email:</strong> ${reserva.email}</p>
              <p style="margin:4px 0;"><strong>Teléfono:</strong> ${reserva.telefono}</p>
              <p style="margin:4px 0;"><strong>Servicio:</strong> ${servicioTexto}</p>
              <p style="margin:4px 0;"><strong>Fecha:</strong> ${reserva.fecha}</p>
            </div>
            <p style="margin:0; line-height:1.6;">Por favor, contacta con el cliente cuanto antes para confirmar la disponibilidad y cerrar la reserva.</p>
          </div>
          <div style="background:#f8fafc; padding:16px 32px; border-top:1px solid #e5e7eb; font-size:12px; color:#64748b; text-align:center;">
            Nesia Detail Car • Gestión de reservas
          </div>
        </div>
      </div>
    `;

    const customerTemplate = `
      <div style="font-family: Arial, sans-serif; background:#f6f8fb; padding:24px;">
        <div style="max-width:680px; margin:0 auto; background:#ffffff; border-radius:18px; overflow:hidden; border:1px solid #e5e7eb;">
          <div style="background: linear-gradient(135deg, #0f172a, #2563eb); padding:28px 32px; color:#ffffff;">
            <h1 style="margin:0; font-size:24px;">Tu reserva está registrada</h1>
            <p style="margin:8px 0 0; opacity:0.95;">Gracias por confiar en Nesia Detail Car. Hemos recibido tu solicitud correctamente.</p>
          </div>
          <div style="padding:28px 32px; color:#111827;">
            <p style="margin:0 0 16px; font-size:16px;">Hola <strong>${reserva.nombreCliente}</strong>,</p>
            <p style="margin:0 0 16px; line-height:1.6;">Tu reserva ha quedado registrada y la estaremos revisando. En breve nos pondremos en contacto contigo para confirmar los detalles.</p>
            <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:16px; margin-bottom:20px;">
              <p style="margin:4px 0;"><strong>Servicio:</strong> ${servicioTexto}</p>
              <p style="margin:4px 0;"><strong>Fecha:</strong> ${reserva.fecha}</p>
              <p style="margin:4px 0;"><strong>Teléfono:</strong> ${reserva.telefono}</p>
            </div>
            <p style="margin:0 0 16px; line-height:1.6;">Si quieres, puedes contactar con nosotros directamente por WhatsApp para cualquier duda.</p>
            <a href="${whatsappLink}" style="display:inline-block; background:#25D366; color:#ffffff; text-decoration:none; padding:12px 20px; border-radius:999px; font-weight:700;">Contactar por WhatsApp</a>
          </div>
          <div style="background:#f8fafc; padding:16px 32px; border-top:1px solid #e5e7eb; font-size:12px; color:#64748b; text-align:center;">
            Nesia Detail Car • Estilo, detalle y cuidado para tu vehículo
          </div>
        </div>
      </div>
    `;

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: businessEmail,
      subject: `Nueva reserva en Nesia Detail Car - ${reserva.nombreCliente}`,
      html: businessTemplate,
    };

    const customerMailOptions = {
      from: process.env.SMTP_USER,
      to: customerEmail,
      subject: `Tu reserva en Nesia Detail Car ha sido recibida`,
      html: customerTemplate,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      if (customerEmail && customerEmail !== businessEmail) {
        await this.transporter.sendMail(customerMailOptions);
      }
      this.logger.log(`Correo de reserva enviado a ${mailOptions.to}${customerEmail && customerEmail !== businessEmail ? ` y ${customerMailOptions.to}` : ''}`);
      return true;
    } catch (error) {
      this.logger.error('No se pudo enviar el correo de reserva', error instanceof Error ? error.stack : error);
      return false;
    }
  }
}
