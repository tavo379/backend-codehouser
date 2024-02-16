import express, { json, urlencoded } from "express";
import { __dirname, mongoStoreParameters } from "./utils.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import handlebars from "express-handlebars";
import cookieParser from "cookie-parser";
import session from "express-session";
import "./persistance/daos/factory.js";
import morgan from "morgan";
import "./passport/passport-local.js";
import "./passport/passport-github.js";
import productRouter from "./routes/productRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import viewsRouter from "./routes/viewsRoutes.js";
import userRouter from "./routes/userRoutes.js";
import apiRouter from "./routes/index.js";
import passport from "passport";
import "dotenv/config";
import config from "./utils/config.js";

import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { info } from "./documentacion/info.js";

// Constantes
const PORT = config.server.PORT;
const PUBLIC_DIR = __dirname + "/public";
const VIEWS_DIR = __dirname + "/views";

// Configuración de la aplicación
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(PUBLIC_DIR));
app.use(errorHandler);
app.use(morgan("dev"));

// Configuración de Handlebars
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", VIEWS_DIR);

app.use(cookieParser());
app.use(session(mongoStoreParameters));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  // Verificar si el usuario está autenticado
  if (req.user) {
    req.users = req.user; // Puedes cambiar esto a req.users si es necesario
  }
  next();
});

const specs = swaggerJSDoc(info);
// Rutas
app.use("/documentacion", swaggerUI.serve, swaggerUI.setup(specs));
app.use("/", viewsRouter);
app.use("/api", apiRouter);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en el puerto ${PORT}`);
});
