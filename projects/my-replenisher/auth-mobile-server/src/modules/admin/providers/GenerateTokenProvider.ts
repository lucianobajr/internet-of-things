import { sign } from "jsonwebtoken";

class GenerateTokenProvider {
  async execute(userId: string) {
    const token = sign({}, String(process.env.MD5_HASH), {
      subject: userId,
      expiresIn: "1d",
    });

    return token;
  }
}

export { GenerateTokenProvider };
