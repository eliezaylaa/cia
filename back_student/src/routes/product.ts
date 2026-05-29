import {Router} from 'express';
import ProductController from '../controller/ProductController';
import {checkJwt} from '../middlewares/checkJwt';
import {checkRole} from '../middlewares/checkRole';

const router = Router();

router.get('/', [checkJwt], ProductController.listAll);
router.get('/:id([0-9]+)', [checkJwt], ProductController.getOneById);
router.post('/', [checkJwt, checkRole(['ADMIN'])], ProductController.newProduct);
router.patch('/:id([0-9]+)', [checkJwt, checkRole(['ADMIN'])], ProductController.editProduct);
router.delete('/:id([0-9]+)', [checkJwt, checkRole(['ADMIN'])], ProductController.deleteProduct);

export default router;
