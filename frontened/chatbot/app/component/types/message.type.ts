export type Message = {
  user: string;
  msg: string;
  time: string;
  status?: "sent" | "delivered" | "seen";
  type?: "text" | "image";
};