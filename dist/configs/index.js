"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieConfig = void 0;
exports.cookieConfig = {
    httpOnly: true, // to disable accessing cookie via client side js
    secure: true, // to force https (if you use it)
    //maxAge: 1000000, // ttl in seconds (remove this option and cookie will die when browser is closed)
    //signed: true // if you use the secret with cookieParser
};
