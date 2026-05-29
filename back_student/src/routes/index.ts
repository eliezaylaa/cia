import {Router} from 'express';
import auth from './auth';
import user from './user';
import product from './product';
import order from './order';

const routes = Router();

routes.use('/auth', auth);
routes.use('/user', user);
routes.use('/product', product);
routes.use('/order', order);

export default routes;
