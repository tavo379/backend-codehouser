import { Router } from "express";
import passport from "passport";
import { login, logoutUserC, current, getAll, createUserMocks, getUsersMocks, loginApi, recoverPassword } from "../controllers/userControllers.js";
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
userRouter.post("/recover-password", recoverPassword);

/* TODO: refactor */
app.post("/api/users/reset-password", async (req, res) => {
  const { token, password, confirmPassword } = req.body;

  // Validar token

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  if (!decodedToken) {
    return res.status(401).json({ error: "Token inválido" });
  }

  // Validar contraseña

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Las contraseñas no coinciden" });

  }

  // Actualizar contraseña del usuario

  const user = await User.findOne({ email: decodedToken.email });

  user.password = password;
  await user.save();

  res.status(200).json({ message: "Contraseña restablecida correctamente" });
});

export default userRouter;
