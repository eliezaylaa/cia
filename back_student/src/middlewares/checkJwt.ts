import {NextFunction, Request, Response} from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const legacyAuth = req.headers.auth as string;

  let token: string;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } else if (legacyAuth) {
    token = legacyAuth;
  } else {
    res.status(400).send('No token provided');
    return;
  }

  let jwtPayload;

  try {
    jwtPayload = jwt.verify(token, config.jwtSecret) as any;
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    res.status(401).send("You don't have the rights");
    return;
  }

  const {userId, username} = jwtPayload;
  const newToken = jwt.sign({userId, username}, config.jwtSecret, {
    expiresIn: '1h',
  });
  res.setHeader('token', newToken);

  next();
};
