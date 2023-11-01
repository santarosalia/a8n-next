import jwt, { JwtPayload } from 'jsonwebtoken';
import { jwtVerify } from 'jose'
interface SignOption {
    expiresIn?: string | number;
}

export const signJwt = (payload: JwtPayload, options: SignOption) => {
    const secretKey = process.env.SECRET_KEY!;
    const token = jwt.sign(payload, secretKey, options);
    return token;
}

export const verifyJwt = (token: string) => {
    try {
      const secret_key = process.env.SECRET_KEY;
      jwt.verify(token, secret_key!);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
}

export const decodeJwt = (payload: string) => {
  return jwt.decode(payload);
}