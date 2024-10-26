export type User = string | undefined | null;
export type Message = {
  id: string;
  user: User;
  text: string;
};
