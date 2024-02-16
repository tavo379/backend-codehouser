import { Router } from "express";
import passport from "passport";
import * as controller from "../controllers/productControllers.js";
import { ckeckAdminRole } from "../middlewares/roleValidator.js";

const productRouter = Router();

// DTO
productRouter.route('/dto/:id')
  .get(passport.authenticate('jwt'), ckeckAdminRole, controller.getByIdDTO);

productRouter.route('/dto')
  .post(passport.authenticate('jwt'), ckeckAdminRole, controller.createProdDTO);

// MOCKS
productRouter.route('/mockingproducts')
  .post(controller.createProductsMocks);

productRouter.route('/getmockingproducts')
  .get(passport.authenticate('jwt'), controller.getProductsMocks);

// Resto de APIs
productRouter.route('/')
  .get(passport.authenticate('jwt'), controller.getproduct)
  .post(passport.authenticate('jwt'), ckeckAdminRole, controller.addProduct);

productRouter.route('/:id')
  .get(passport.authenticate('jwt'), controller.getProductById)
  .put(passport.authenticate('jwt'), ckeckAdminRole, controller.updateProduct)
  .delete(passport.authenticate('jwt'), ckeckAdminRole, controller.deleteProduct);

export default productRouter;
