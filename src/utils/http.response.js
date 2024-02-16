const HttpStatus = {
    OK: 200,
    NOT_FOUND: 404,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    INTERNAL_SERVER_ERROR: 500,
};

const sendResponse = (res, status, message, data = null) => {
    return res.status(status).json({
        status,
        message,
        data,
    });
};

export class HttpResponse {
    Ok(res, data) {
        return sendResponse(res, HttpStatus.OK, 'success', data);
    }

    NotFound(res, data) {
        return sendResponse(res, HttpStatus.NOT_FOUND, 'Not Found', data);
    }

    Unauthorized(res, data) {
        return sendResponse(res, HttpStatus.UNAUTHORIZED, 'Unauthorized', data);
    }

    Forbidden(res, data) {
        return sendResponse(res, HttpStatus.FORBIDDEN, 'Forbidden', data);
    }

    ServerError(res, data) {
        return sendResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error', data);
    }
}
