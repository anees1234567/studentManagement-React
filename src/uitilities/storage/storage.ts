export const storageKey = {
  TOKEN: "auth_token",
  REFRESH_TOKEN: "refresh_token",
};

export const setItem = (key: string, value: any) => {
  try {
    const valueToStore = typeof value === 'object' && value.accessToken ? value.accessToken : value;
    localStorage.setItem(key, JSON.stringify(valueToStore));
  } catch (error) {
    console.error("Error saving to localStorage", error);
  }
};

export const getItem = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  } catch (error) {
    console.error("Error reading from localStorage", error);
    return null;
  }
};

export const removeItem = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing from localStorage", error);
  }
};

export const clearStorage = () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error("Error clearing localStorage", error);
  }
};