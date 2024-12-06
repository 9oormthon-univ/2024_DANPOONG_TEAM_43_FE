import { useQuery } from '@tanstack/react-query';
import { FeedData, GroupData, MemoryData, fetchFeedData, fetchGroupData, fetchMemories } from './group';

export const useGroupDataQuery = (groupId?: number) => {
  return useQuery<GroupData>({
    queryKey: ['groupData', groupId],
    queryFn: () => fetchGroupData(groupId),
    enabled: groupId !== undefined,
    staleTime: 1000 * 60 * 5, // 5분 캐싱
  });
};

export const useFeedDataQuery = (groupId: number) => {
  return useQuery<FeedData[]>({
    queryKey: ['feedData', groupId],
    queryFn: () => fetchFeedData(groupId),
    enabled: !!groupId,
    staleTime: 1000 * 60 * 5, // 5분 캐싱
  });
};

export const useMemoriesQuery = (groupId: number) => {
  return useQuery<MemoryData[]>({
    queryKey: ['memories', groupId],
    queryFn: () => fetchMemories(groupId),
    enabled: !!groupId,
    staleTime: 1000 * 60 * 5, // 5분 캐싱
  });
};
