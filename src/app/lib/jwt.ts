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
      const verify = jwt.verify(token, secret_key!);
      return verify as JwtPayload;
    } catch (error) {
      console.log(error);
      return null;
    }
}

export const decodeJwt = (payload: string) => {
  return jwt.decode(payload);
}

export const verifyJwtByJose = async (token: string) => {
  try {
    const secret_key = process.env.SECRET_KEY;
    const verify = await jwtVerify(token, new TextEncoder().encode(secret_key!));
    return verify;
  } catch (error) {
    console.log(error);
    return null;
  }
}