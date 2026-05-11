export interface QuickAccessFriend {
  id: number;
  name: string;
  initials: string;
  avatar: string | null;
  bgColor: string;
}

export interface PendingRequest {
  request_id: number;
  sender_id: number;
  sender_name: string;
  sender_initials: string;
  created_at: string;
  bgColor: string;
}

export interface DefaultResponse {
  message: string;
}
