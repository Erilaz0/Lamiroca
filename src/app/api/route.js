import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req) {
  const { searchParams } = new URL(req.url);
  const user = searchParams.get("user");
  const password = searchParams.get("password");
  const userEnv = process.env.USER;
  const psswdEnv = process.env.PASSWORD;
  const date = new Date();
  const key = process.env.KEY;
  try {
    const generateJWT = () => {
      return jwt.sign({ user: userEnv }, key, { expiresIn: "1h" });
    };
    if (user === userEnv && password === psswdEnv) {
      const cookieData = generateJWT(date);
      cookies().set({
        name: "token",
        value: cookieData,
        httpOnly: true,
        secure: true,
        path: "/",
        maxAge: 60 * 60 * 24,
      });
      return NextResponse.json({ message: "200OK" });
    } else {
      return NextResponse.json({ ERROR: "INCORRECT USER OR PASSWORD" });
    }
  } catch (error) {
    return NextResponse.json({ ERROR: "INCORRECT USER OR PASSWORD" });
  }
}
