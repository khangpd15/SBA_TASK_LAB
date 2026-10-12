import { INITIAL_CATEGORIES, INITIAL_NEWS, INITIAL_USERS } from './initialData';

const STORAGE_KEYS = {
  CATEGORIES: 'funews_categories',
  NEWS: 'funews_news',
  USERS: 'funews_users',
  AUTH: 'funews_current_user',
  THEME: 'funews_theme_dark'
};

// Generic loader with fallback and null safety
function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error loading key "${key}" from localStorage:`, err);
    return fallback;
  }
}

function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error(`Error saving key "${key}" to localStorage:`, err);
  }
}

export const StorageService = {
  // Categories
  getCategories: () => loadFromStorage(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES),
  saveCategories: (categories) => saveToStorage(STORAGE_KEYS.CATEGORIES, categories),

  // News
  getNews: () => loadFromStorage(STORAGE_KEYS.NEWS, INITIAL_NEWS),
  saveNews: (news) => saveToStorage(STORAGE_KEYS.NEWS, news),

  // Users
  getUsers: () => loadFromStorage(STORAGE_KEYS.USERS, INITIAL_USERS),
  saveUsers: (users) => saveToStorage(STORAGE_KEYS.USERS, users),

  // Current session/auth
  getCurrentUser: () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.AUTH);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },
  saveCurrentUser: (user) => {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.AUTH);
    }
  },

  // Dark mode
  getDarkMode: () => {
    try {
      return localStorage.getItem(STORAGE_KEYS.THEME) === 'true';
    } catch {
      return false;
    }
  },
  setDarkMode: (isDark) => {
    localStorage.setItem(STORAGE_KEYS.THEME, String(isDark));
  },

  // Reset to initial factory defaults
  resetAll: () => {
    saveToStorage(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
    saveToStorage(STORAGE_KEYS.NEWS, INITIAL_NEWS);
    saveToStorage(STORAGE_KEYS.USERS, INITIAL_USERS);
    return {
      categories: INITIAL_CATEGORIES,
      news: INITIAL_NEWS,
      users: INITIAL_USERS
    };
  }
};
