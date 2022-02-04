export const lowercaseKeys = (obj: any) =>
  Object.keys(obj).reduce((acc: any, key: any) => {
    acc[key.toLowerCase()] = obj[key];
    return acc;
  }, {});
