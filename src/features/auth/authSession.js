import { authStorageKey } from "../../app/config/env";

export const getStoredAuth = () => {
  try {
    return JSON.parse(localStorage.getItem(authStorageKey)) || null;
  } catch {
    return null;
  }
};

export const storeAuth = (authResult) => {
  localStorage.setItem(authStorageKey, JSON.stringify(authResult));
};

export const clearStoredAuth = () => {
  localStorage.removeItem(authStorageKey);
};
