export function localStorageGet(name, defaultValue = '') {
  const valueFromStore = localStorage.getItem(name);
  if (valueFromStore === null) return defaultValue; // No value in store, return default one

  try {
    const jsonParsed = JSON.parse(valueFromStore);
    if (['boolean', 'number', 'bigint', 'string', 'object'].includes(typeof jsonParsed)) {
      return jsonParsed; // We successfully parse JS value from the store
    }
  } catch (error) {
    console.log(error);
    return defaultValue;
  }

  // console.log(`localStorageGet(${name}) - result:`, valueFromStore)
  return valueFromStore; // Return string value as it is
}

export function localStorageSet(name, value) {
  if (typeof value === 'undefined') {
    return; // Do not store undefined values
  }

  let valueAsString;
  if (typeof value === 'object') {
    valueAsString = JSON.stringify(value);
  } else {
    valueAsString = String(value);
  }

  localStorage.setItem(name, valueAsString);
  // console.log(`localStorageSet(${name}, ${valueAsString})`);
}

export function localStorageDelete(name) {
  // console.log(`localStorageDelete(${name})`);
  if (name) {
    localStorage.removeItem(name);
  } else {
    localStorage.clear();
  }
}
