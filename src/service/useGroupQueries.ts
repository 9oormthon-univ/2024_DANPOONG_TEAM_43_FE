import { useQuery } from '@tanstack/react-query';
import { FeedData, Group, GroupData, MemoryData, fetchFeedData, fetchGroupData, fetchGroups, fetchMemories } from './group';

export const useGroupDataQuery = (groupId?: number) => {
  return useQuery<GroupData>({
    queryKey: ['groupData', groupId],
    queryFn: () => fetchGroupData(groupId),
    enabled: groupId !== undefined,
    staleTime: 1000 * 60 * 5,
  });
};

export const useFeedDataQuery = (groupId: number) => {
  return useQuery<FeedData[]>({
    queryKey: ['feedData', groupId],
    queryFn: () => fetchFeedData(groupId),
    enabled: !!groupId,
    staleTime: 1000 * 60 * 5,
  });
};

export const useMemoriesQuery = (groupId: number) => {
  return useQuery<MemoryData[]>({
    queryKey: ['memories', groupId],
    queryFn: () => fetchMemories(groupId),
    enabled: !!groupId,
    staleTime: 1000 * 60 * 5,
  });
};

export const useGroupsQuery = () => {
    return useQuery<Group[]>({
      queryKey: ['groups'],
      queryFn: fetchGroups,
      staleTime: 1000 * 60 * 5,
    });
  };