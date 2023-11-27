import jwt from "jsonwebtoken/index.js";
var sign = jwt.sign;
// Function to create and sign a JWT
export function createJWTAsync(payload) {
    return new Promise(function(resolve, reject) {
        var options = {
            expiresIn: "24h"
        };
        var SECRET_KEY = process.env.SECRET_KEY || "";
        // Create and sign the token
        sign(payload, SECRET_KEY, options, function(error, token) {
            if (error) {
                return reject(error);
            }
            return resolve(token);
        });
    });
}
