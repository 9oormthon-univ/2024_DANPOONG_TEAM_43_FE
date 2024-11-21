import { useQuery } from '@tanstack/react-query';
import axiosInstance from 'utils/axiosInstance';
import { useUserStore } from 'stores/useUserStore';
import { NeighborSuggestionsResponse } from 'type/neighborSuggestions';

export const fetchNeighborSuggestions = async (userType: string): Promise<NeighborSuggestionsResponse> => {
  const apiUrl =
    userType === 'CAREGIVER'
      ? '/caregiver/recommend-users'
      : '/non-caregiver/recommend-users';

  const response = await axiosInstance.get<NeighborSuggestionsResponse>(apiUrl);

  if (response.data.status !== 200) {
    throw new Error(response.data.message || 'Failed to fetch neighbor suggestions');
  }

  return response.data;
};

export const useNeighborSuggestionsQuery = () => {
  const userType = useUserStore((state) => state.userInfo.userType);

  return useQuery({
    queryKey: ['neighborSuggestions', userType],
    queryFn: () => fetchNeighborSuggestions(userType),
    enabled: !!userType, 
    staleTime: 5 * 60 * 1000,
  });
};