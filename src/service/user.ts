import { useQuery } from '@tanstack/react-query';
import { UserData, UserDetailResponse } from 'type/user';
import axiosInstance from 'utils/axiosInstance';

export const fetchUserData = async (): Promise<UserData | null> => {
  try {
    const response = await axiosInstance.get('/mypage');
    if (response.data.status === 200) {
      return response.data.data;
    }
    return null;
  } catch (error) {
    console.error('Failed to fetch user data', error);
    return null;
  }
};

export const useUserDataQuery = () => {
  return useQuery<UserData | null>({
    queryKey: ['userData'],
    queryFn: fetchUserData,
    staleTime: 5 * 60 * 1000, 
  });
};

export const fetchUserDetail = async (userId: number): Promise<UserDetailResponse> => {
  const { data } = await axiosInstance.get(`/user-info/detail/${userId}`);
  return data.data; 
};

export const useUserDetailQuery = (userId: number) => {
  return useQuery<UserDetailResponse, Error>({
    queryKey: ['userDetail', userId], 
    queryFn: () => fetchUserDetail(userId),
    enabled: !!userId, 
    staleTime: 5 * 60 * 1000,
    retry: 2, 
  });
};