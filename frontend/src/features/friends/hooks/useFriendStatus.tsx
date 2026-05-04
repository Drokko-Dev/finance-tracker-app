import {
  getQuickAccessFriends,
  getPendingRequests,
  acceptFriendRequest,
  rejectFriendRequest,
} from "@/api/friends";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useFriendStats = () => {
  const queryClient = useQueryClient();

  const { data: friends, isLoading: isFriendsLoading } = useQuery({
    queryKey: ["QuickAccessFriends"],
    queryFn: () => getQuickAccessFriends(),
  });

  const { data: pendingFriends, isLoading: isPendingLoading } = useQuery({
    queryKey: ["PendingFriends"],
    queryFn: () => getPendingRequests(),
  });

  const { mutate: acceptFriend, isPending: isAcceptFriendLoading } =
    useMutation({
      mutationFn: (requestId: number) => acceptFriendRequest(requestId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["PendingFriends"] });
        queryClient.invalidateQueries({ queryKey: ["QuickAccessFriends"] });
      },
    });

  const { mutate: rejectFriend, isPending: isRejectFriendLoading } =
    useMutation({
      mutationFn: (requestId: number) => rejectFriendRequest(requestId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["PendingFriends"] });
      },
    });

  return {
    friends,
    pendingFriends,
    acceptFriend,
    rejectFriend,
    isFriendsLoading,
    isPendingLoading,
    isAcceptFriendLoading,
    isRejectFriendLoading,
  };
};
