export const serializeFunction = (func: Function) => func.toString();
export const deserializeFunction = (funcString: string) => new Function('return ' + funcString)()
export const serializeObject = (object: any) => {
  const newObject: Record<string, any> = {};
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      const value = object[key];
      if(value instanceof Function)
        newObject[`${key}-function`] = serializeFunction(value)
      else if(typeof value === 'object')
        newObject[key] = serializeObject(value);
      else newObject[key] = value;
    }
  }
  return newObject;
}