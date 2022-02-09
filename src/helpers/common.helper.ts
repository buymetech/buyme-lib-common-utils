export class CommonHelper {
  static flatten = (obj: any) => {
    const result: any = {};
    for (const i in obj) {
      if (typeof obj[i] === 'object' && !Array.isArray(obj[i])) {
        const temp = CommonHelper.flatten(obj[i]);
        for (const j in temp) {
          result[i + '.' + j] = temp[j];
        }
      } else {
        result[i] = obj[i];
      }
    }
    return result;
  };
}
