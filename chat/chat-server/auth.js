import { expressjwt } from 'express-jwt';
import { getUser } from './db/users.js';
import jwt from 'jsonwebtoken';

const secret = Buffer.from('+Z3zPGXY7v/0MoMm1p8QuHDGGVrhELGd', 'base64');

export const authMiddleware = expressjwt({
  algorithms: ['HS256'],
  credentialsRequired: false,
  secret,
});

export async function handleLogin(req, res) {
  const { username, password } = req.body;
  const user = await getUser(username);

  if (!user || user.password !== password) {
    res.sendStatus(401);
  } else {
    const claims = { sub: username };
    const token = jwt.sign(claims, secret);
    res.json({ token });
  }
}

export function decodeToken(token) {
  return jwt.verify(token, secret);
}
