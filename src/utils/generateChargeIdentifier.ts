import crypto from "crypto";

export function generateOTP() {
  let otp = "";
  for (let i = 0; i < 10; i++) {
    const randomInteger = crypto.randomInt(0, 9);
    otp += randomInteger;
  }
  return otp;
}
