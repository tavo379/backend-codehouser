import { createHash, isValidPassword } from "../../../utils.js";
import { createCart } from "./cartDaoMongo.js";
import { UserModel } from "./models/userModel.js";
import { fakerES_MX as faker } from "@faker-js/faker";
import { UserModelMocks } from "./models/userModel_Mocks.js";
import { logger } from '../../../utils/logger.js';
import mongoose from "mongoose";


const logError = (error) => {
  logger.error ('Error User Dao Mongo:', error);
  throw error;
};

const logUserExists = (userExist) => {
  console.log(`El usuario ${userExist.email} ya existe`);
  return false;
};

const logUserCreated = (newUser) => {
  console.log(`Usuario ${newUser.email} creado`);
  return newUser;
};

export const registerUser = async (user) => {
  try {
    const { email, password } = users;
    const userExist = await getUserByEmail(email);
    console.log(email)
    console.log(users)
    return userExist ? logUserExists(userExist) : logUserCreated(await createNewUser(users));
  } catch (error) {
    logError(error);
  }
};

export const loginUser = async (users) => {
  try {
    console.log("pasa por loginUser")
    const { email, password } = users;
    const userExist = await getUserByEmail(email);
    
    return userExist ? (isValidPassword(password, userExist) ? userExist : false) : false;
  } catch (error) {
    logError(error);
    console.log("falla por loginUser")
  }
};

export const getUserByID = async (id) => {
  try {
    return await UserModel.findById(id) || false;
  } catch (error) {
    logError(error);
  }
};

export const getAll = async () => {
  try {
    return await UserModel.find({});
  } catch (error) {
    logError(error);
  }
};

export const getUserByEmail = async (email) => {
  console.log('getUserByEmail', email)
  try {
    console.log("pasa por el try de getUSerByEmail")
    return await UserModel.findOne(  {'email': `${email}`}  ) || false;
  } catch (error) {
    console.log('falla por getUserByEmail', 'UserModel:', UserModel, "Email:", email, "Error:", error.message)
    logError(error);
  }
};

export const createUsersMock = async (cant = 50) => {
  try {
    const users = [];

    for (let i = 0; i < cant; i++) {
      const user = await UserModelMocks.create({
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        age: Math.floor(Math.random() * 99),
        password: createHash(faker.internet.password()),
      });

      users.push(user);
    }
    return users;
  } catch (error) {
    logError(error);
  }
};

export const getUsersMocks = async () => {
  try {
    return await UserModelMocks.find({});
  } catch (error) {
    logError(error);
  }
};

const createNewUser = async (user) => {
  const newCart = await createCart();
  const role = user.email === "esadmincoder@coderhouse.com" && user.password === "esAdmin" ? "admin" : "user";

  return UserModel.create({
    ...user,
    password: createHash(user.password),
    role,
    cart: [{ CartID: newCart.id }],
  });
};
