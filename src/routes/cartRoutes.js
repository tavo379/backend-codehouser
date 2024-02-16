import { Router } from 'express';
import * as controller from '../controllers/cartControllers.js';
import passport from 'passport';

const cartRouter = Router();

cartRouter.use(passport.authenticate("jwt"));

cartRouter.route('/:id/purchase')
  .post(controller.generateOrder);

cartRouter.route('/purchase')
  .post(controller.generateOrder);

cartRouter.route('/:id/prod/:productId')
  .post(controller.saveProductToCart)
  .delete(controller.deleteProductInCart)
  .put(controller.updateQuantityInCart);

cartRouter.route('/:id')
  .get(controller.getCartById)
  .post(controller.createCart)
  .delete(controller.cleanCart)
  .put(controller.updateCart);

cartRouter.route('/')
  .get(controller.getCart);

export default cartRouter;
