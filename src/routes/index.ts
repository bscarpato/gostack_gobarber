import { Router } from 'express';
import appointmentsRouter from './appointments.routes';
import usersRouter from './users.route';
import sessionsRouter from './sessions.route';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
