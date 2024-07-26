// pages/api/auth/signin.ts

import type { NextApiRequest, NextApiResponse } from "next";

interface SignInRequestBody {
  username: string;
  password: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { username, password }: SignInRequestBody = req.body;

      // Lógica de autenticación
      if (username === "user" && password === "password") {
        res.status(200).json({ message: "Signin successful", success: true });
      } else {
        res
          .status(401)
          .json({ message: "Invalid credentials", success: false });
      }
    } catch (error) {
      res.status(500).json({ message: "An error occurred", success: false });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
