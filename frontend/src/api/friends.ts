import apiClient from "./apiClient";
import type {
  QuickAccessFriend,
  PendingRequest,
  DefaultResponse,
  SentRequest,
} from "../types/Friends";

export const getQuickAccessFriends = async (): Promise<QuickAccessFriend[]> => {
  const response = await apiClient.get<QuickAccessFriend[]>(
    "/api/v1/friends/quick-access",
  );
  return response.data;
};

export const sendFriendRequest = async (
  email: string,
): Promise<DefaultResponse> => {
  const response = await apiClient.post<DefaultResponse>(
    "/api/v1/friends/request",
    { email },
  );
  return response.data;
};

export const getPendingRequests = async (): Promise<PendingRequest[]> => {
  const response = await apiClient.get<PendingRequest[]>(
    "/api/v1/friends/requests/pending",
  );
  return response.data;
};

export const getSentRequests = async (): Promise<SentRequest[]> => {
  const response = await apiClient.get<SentRequest[]>(
    "/api/v1/friends/requests/sent",
  );
  return response.data;
};

export const acceptFriendRequest = async (
  requestId: number,
): Promise<DefaultResponse> => {
  const response = await apiClient.post<DefaultResponse>(
    `/api/v1/friends/requests/${requestId}/accept`,
  );
  return response.data;
};

export const rejectFriendRequest = async (
  requestId: number,
): Promise<DefaultResponse> => {
  const response = await apiClient.delete<DefaultResponse>(
    `/api/v1/friends/requests/${requestId}/reject`,
  );
  return response.data;
};

export const cancelFriendRequest = async (
  requestId: number,
): Promise<DefaultResponse> => {
  const response = await apiClient.delete<DefaultResponse>(
    `/api/v1/friends/requests/${requestId}/cancel`,
  );
  return response.data;
};
