export interface Message {
  id: string;
  content: string;
  fromUser: boolean;
  timestamp: Date;
}