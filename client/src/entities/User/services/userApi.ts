import CryptoJS from 'crypto-js';


export const SECRET_KEY = import.meta.env.VITE_SECRET_KEY || "secret-dev-key";

export const calculateHmacSignature = (
  data: string,
  secret: string
): string => {
  const hash = CryptoJS.HmacSHA256(data, secret);
  return hash.toString(CryptoJS.enc.Hex);
}; 

