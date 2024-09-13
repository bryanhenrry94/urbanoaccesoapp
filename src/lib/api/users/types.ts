export type User = {
  id: string;
  email: string;
  password_hash: string;
  name: string;
  image: string;
};

export type UserCreationData = Omit<User, "id">;

export type UserUpdateData = Partial<Omit<User, "id">>;

export type UserPublicData = Omit<User, "password_hash">;
