import { Router } from "express";
import cartRouter from './cartRoutes.js';
import productRouter from './productRoutes.js';
import userRouter from './userRoutes.js';
import emailRouter from './emailRoutes.js';
// import smsRouter from './smsRoutes.js';

const router = Router();

router.use('/products', productRouter);
router.use('/cart', cartRouter);
router.use('/users', userRouter);
router.use('/email', emailRouter);
// router.use('/sms', smsRouter);

export default router;
