export class CommonHelper {
  static findValInObject(object: any, key: string) {
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
