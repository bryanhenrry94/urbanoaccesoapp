import { z } from "zod";
import { UserCreationData, UserUpdateData } from "./types";

const userSchema = z.object({
  email: z.string().email(),
  password_hash: z.string().min(6),
  name: z.string().min(1),
  image: z.string().url(),
});

export function validateUserCreation(data: unknown) {
  return userSchema.safeParse(data);
}

export function validateUserUpdate(data: unknown) {
  return userSchema.partial().safeParse(data);
}
