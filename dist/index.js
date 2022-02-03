"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_module_js_1 = __importDefault(require("./logger/logger.module.js"));
class Utils {
    static logger(opt) {
        return new logger_module_js_1.default(opt).logger;
    }
}
exports.default = Utils;
