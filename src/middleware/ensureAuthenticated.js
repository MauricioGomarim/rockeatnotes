const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");

function ensureAuthenticated(request, response, next){
     const authHeader = request.headers.authorization;
     if(!authHeader){
         throw new AppError("JWT TOKEN NAO INFORMADO");
     }
     const [, token] = authHeader.split(" ");

     try {
        const {sub: user_id} = verify(token, authConfig.jwt.secret);

        request.user = {
            id: Number(user_id),
        };

        return next();
     } catch {
        console.log(token)
        throw new AppError("JWT nao informado!", 401);
     }
}

module.exports = ensureAuthenticated;