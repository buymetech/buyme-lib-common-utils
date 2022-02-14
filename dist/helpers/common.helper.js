"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonHelper = void 0;
class CommonHelper {
    static findValInObject(object, key) {
        let value;
        Object.keys(object).some(function (k) {
            if (k === key) {
                value = object[k];
                return true;
            }
            if (object[k] && typeof object[k] === 'object') {
                value = CommonHelper.findValInObject(object[k], key);
                return value !== undefined;
            }
        });
        return value;
    }
}
exports.CommonHelper = CommonHelper;
