import { Test, TestingModule } from '@nestjs/testing';
import { ReservasService } from './reservas.service';
import { getModelToken } from '@nestjs/mongoose';
import { Reserva } from './entities/reserva.entity';
import { MailService } from '../common/mail/mail.service';

describe('ReservasService', () => {
  let service: ReservasService;
  let mailService: { sendReservationEmail: jest.Mock };

  beforeEach(async () => {
    mailService = { sendReservationEmail: jest.fn().mockResolvedValue(undefined) };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservasService,
        { provide: getModelToken(Reserva.name), useValue: { save: jest.fn().mockResolvedValue({}) } },
        { provide: MailService, useValue: mailService },
      ],
    }).compile();

    service = module.get<ReservasService>(ReservasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should send an email after creating a reservation', async () => {
    const reserva = {
      nombreCliente: 'Ana',
      email: 'ana@test.com',
      telefono: '600000000',
      servicioId: 'svc1',
      fecha: '2026-08-10',
    };

    await service.create(reserva);

    expect(mailService.sendReservationEmail).toHaveBeenCalledWith(expect.objectContaining({ email: reserva.email }));
  });

  it('should still create the reservation when email sending fails', async () => {
    mailService.sendReservationEmail.mockRejectedValueOnce(new Error('SMTP failure'));

    const reserva = {
      nombreCliente: 'Luis',
      email: 'luis@test.com',
      telefono: '600000001',
      servicioId: 'svc2',
      fecha: '2026-08-11',
    };

    await expect(service.create(reserva)).resolves.toBeDefined();
  });
});