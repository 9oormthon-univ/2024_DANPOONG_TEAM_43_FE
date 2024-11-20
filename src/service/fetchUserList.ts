import { useQuery } from '@tanstack/react-query';
import { UserListResponse, mapUser } from 'type/mapUserList';
import axiosInstance from 'utils/axiosInstance';

export const fetchUserList = async (
  city: string,
  userType?: string 
): Promise<mapUser[]> => {
  try {
    const params: Record<string, string> = { city };
    if (userType) {
      params.userType = userType; 
    }

    const response = await axiosInstance.get<UserListResponse>('/map/list', {
      params,
    });

    if (response.data.status === 200) {
      return response.data.data;
    }

    return [];
  } catch (error) {
    console.error('Failed to fetch user list:', error);
    return [];
  }
};


export const useUserListQuery = (city: string, userType?: string) => {
  return useQuery<mapUser[]>({
    queryKey: ['userList', city, userType || 'all'], 
    queryFn: () => fetchUserList(city, userType),
    enabled: !!city, 
    staleTime: 5 * 60 * 1000, 
  });
};