// apiservice.js
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; 

export const fetchArticles = async () => {
  const response = await fetch(`${BASE_URL}/api/articles`);
  if (!response.ok) {
    throw new Error('Server responded with an error');
  }
  return await response.json();
};

export const fetchArticle = async (slug) => {
  const response = await fetch(`${BASE_URL}/api/articles/${slug}`);
  if (!response.ok) {
    throw new Error('Server responded with an error');
  }
  return await response.json();
};

export const createArticle = async (article) => {
  const response = await fetch(`${BASE_URL}/api/articles/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(article),
  });
  if (!response.ok) {
    throw new Error('Failed to create the article');
  }
  return await response.json();
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${BASE_URL}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to login');
  }
  return await response.json();
};

export const logoutUser = async () => {
  const response = await fetch(`${BASE_URL}/api/users/logout`, {
    method: 'POST',
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to logout');
  }
};

export const fetchCurrentUser = async () => {
  const response = await fetch(`${BASE_URL}/api/users/me`, { credentials: 'include' });
  if (!response.ok) {
    throw new Error('Failed to fetch current user');
  }
  return await response.json();
};

