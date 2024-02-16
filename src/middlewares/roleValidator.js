import { createResponse } from '../utils.js';


export const ckeckAdminRole = async (req, res, next) => {
console.log(role)
    const { role } = req.users
    if (role !== "admin") return createResponse(res, 403, 'Unauthorized')
    next();

}