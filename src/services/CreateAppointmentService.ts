/* eslint-disable camelcase */
import { getCustomRepository } from 'typeorm';
import { startOfHour } from 'date-fns';
import Appointment from '../model/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentsRepo = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepo.findByDate(appointmentDate);

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked');
    }

    const appointment = appointmentsRepo.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepo.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
