export class CommonHelper {
  static findValInObject(object: any, key: string, del = true) {
    let value;

    Object.keys(object).some(function (k) {
      if (k === key) {
        value = object[k];
        if (del) {
          delete object[k];
        }
        return true;
      }

      if (object[k] && typeof object[k] === 'object') {
        value = CommonHelper.findValInObject(object[k], key);
        return value !== undefined;
      }
    });

    return value;
  }

  static deleteLargeProps(object: any) {
    Object.keys(object).map(function (k) {
      if (object[k] && typeof object[k] === 'object') {
        CommonHelper.deleteLargeProps(object[k]);
      } else if (typeof object[k] === 'string') {
        if (object[k].length > 2000) {
          delete object[k];
        }
      }
    });
  }

}
