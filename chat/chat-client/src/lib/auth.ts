import { jwtDecode } from 'jwt-decode';
import type { User } from '../types';

const ACCESS_TOKEN_KEY = 'accessToken';
const API_URL = 'http://localhost:9000';

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getUser(): User {
  const token = getAccessToken();
  if (!token) {
    return null;
  }
  return getUserFromToken(token);
}

function getUserFromToken(token: string): string | undefined {
  const jwtPayload = jwtDecode(token);
  return jwtPayload.sub;
}

export function logout(): void {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

export async function login(username: string, password: string) {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  if (response.ok) {
    const { token } = await response.json();
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
    return username;
  }
  return null;
}
