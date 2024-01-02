"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRole = exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authenticateJWT(req, res, next) {
    var _a;
    //  console.log(req.header("Authorization")?.split(" ")[1], 'req header');
    //  console.log(process.env.JWT_SECRET, 'secret');
    const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            // console.log(err, 'err');
            return res.status(401).json({ message: "Token is not valid" });
        }
        const decodedToken = decoded;
        req.user = decodedToken;
        next();
    });
}
exports.authenticateJWT = authenticateJWT;
function authorizeRole(allowedRoles) {
    return (req, res, next) => {
        const { role } = req.user;
        if (!allowedRoles.includes(role)) {
            return res.status(403).json({ message: "Forbidden" });
        }
        next();
    };
}
exports.authorizeRole = authorizeRole;
