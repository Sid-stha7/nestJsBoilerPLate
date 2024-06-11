/* eslint-disable @typescript-eslint/no-explicit-any */
export function convertStringToOrderObject(
  str?: string,
  direction?: "ASC" | "DESC",
): Record<string, any> {
  // TODO:: Clean this function
  if (!str) return {};

  const properties = str.split(".");
  const result: Record<string, any> = {};

  let currentObj = result;
  for (let i = 0; i < properties.length; i++) {
    const property = properties[i];
    if (!currentObj.hasOwnProperty(property)) {
      currentObj[property] = {};
    }
    if (i === properties.length - 1) {
      currentObj[property] = direction;
    }
    currentObj = currentObj[property];
  }

  return result;
}
