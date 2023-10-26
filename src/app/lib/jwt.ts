import jwt, { JwtPayload } from 'jsonwebtoken';

interface SignOption {
    expiresIn?: string | number;
}
  
const DEFAULT_SIGN_OPTION: SignOption = {
    expiresIn: "1h",
};

export const getAccessToken = (payload: JwtPayload, options: SignOption = DEFAULT_SIGN_OPTION) => {
    const secretKey = process.env.SECRET_KEY!;
    const token = jwt.sign(payload, secretKey, options);
    return token;
}

export const getRefreshToken = (payload : JwtPayload) => {
  const secretKey = process.env.SECRET_KEY!;
  const token = jwt.sign(payload, secretKey);
  return token;
}
export const verifyJwt = (token: string) => {
    try {
      const secret_key = process.env.SECRET_KEY;
      const decoded = jwt.verify(token, secret_key!);
      return decoded as JwtPayload;
    } catch (error) {
      console.log(error);
      return null;
    }
}