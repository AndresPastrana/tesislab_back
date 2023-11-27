import { handleResponse } from "./index.js";
//Asumimios que ya tenemos un usuario atenticado con un token valido, el user es agregado a la request
export var protectRouteByRole = function(hasRoles) {
    // rome-ignore lint/suspicious/noExplicitAny: <explanation>
    return function(req, res, next) {
        // TODO: Verify that hasRoles is or has valdis roles
        var role = req.user.role;
        if (hasRoles.includes(role)) {
            return next();
        }
        return handleResponse({
            res: res,
            statusCode: 401,
            msg: "Unauthorized",
            error: true
        });
    };
};
