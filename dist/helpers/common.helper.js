"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonHelper = void 0;
class CommonHelper {
}
exports.CommonHelper = CommonHelper;
CommonHelper.flatten = (obj) => {
    const result = {};
    for (const i in obj) {
        if (typeof obj[i] === 'object' && !Array.isArray(obj[i])) {
            const temp = CommonHelper.flatten(obj[i]);
            for (const j in temp) {
                result[i + '.' + j] = temp[j];
            }
        }
        else {
            result[i] = obj[i];
        }
    }
    return result;
};
