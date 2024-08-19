import { getHash } from "./login.utils";

export const JWT_SECRET = '!!!JWT_SECRET!!!'; // prefered from NODE ENV

export const ADMIN = {
    username: 'admin',
    password: getHash('12345'),
}

export const LOGIN_COOKIE_NAME = 'Authorization';

export const OK_JSON = JSON.stringify({ status: 'ok' });