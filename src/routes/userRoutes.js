import { Router } from "express";
import passport from "passport";
import { login, logoutUserC, current, getAll, createUserMocks, getUsersMocks, loginApi } from "../controllers/userControllers.js";
import { ckeckAdminRole } from "../middlewares/roleValidator.js";

const userRouter = Router();

// Rutas de autenticación
userRouter.post(
  "/register",
  passport.authenticate("register", {
    successRedirect: "/login",
    failureRedirect: "/error-register",
    passReqToCallback: true,
  })
);

userRouter.post("/login", login);
userRouter.post("/loginApi", loginApi);
userRouter.get("/logout", logoutUserC);

// Rutas protegidas
userRouter.use(passport.authenticate('jwt'));

userRouter.get("/current", current);

// Verificación de rol de administrador para rutas específicas
userRouter.use(ckeckAdminRole);

userRouter.get("/getuser", getAll);
userRouter.post("/mockingusers", createUserMocks);
userRouter.get("/get-mockingusers", getUsersMocks);

export default userRouter;
