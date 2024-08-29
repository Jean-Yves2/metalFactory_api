import * as session from 'express-session';
import * as redis from 'redis';
import RedisStore from 'connect-redis';

const RedisClient = redis.createClient();

export const sessionMiddleware = session({
  store: new RedisStore({ client: RedisClient }),
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 7, // the cookie will be valid for 1 week
  },
});
