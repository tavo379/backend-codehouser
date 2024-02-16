import currentUserResDTO from "../DTOs/user.res.dto.js";
import { UserModel } from "../daos/mongodb/models/userModel.js";
import { logger } from "../../utils/logger.js";

export const getByIdDTO = async (id) => {
    try {
        const response = await UserModel.findById(id);
        return new currentUserResDTO(response);
    } catch (error) {
        logger.error ('Error User Repo:', error);
    }
};
