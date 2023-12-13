export var handleResponse = function(paylaod) {
    var error = paylaod.error, data = paylaod.data, msg = paylaod.msg, statusCode = paylaod.statusCode, res = paylaod.res;
    var response = {
        success: statusCode >= 200 && statusCode < 300,
        msg: msg || (statusCode >= 200 && statusCode < 300 ? "Success" : "Error"),
        data: data || null,
        error: error || null
    };
    return res.status(statusCode).json(response);
};
