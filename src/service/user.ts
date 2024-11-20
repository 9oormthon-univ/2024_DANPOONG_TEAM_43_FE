import { useQuery } from '@tanstack/react-query';
import { UserData } from 'type/user';
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

export interface UserDetailResponse {
  userId: number;
  username: string;
  age: number | null;
  phoneNum: string;
  city: string;
  address: string;
  detailAddress: string;
  locationAuthentication: boolean;
  userType: string;
  shareLocation: boolean;
  latitude: number;
  longitude: number;
  talk: string;
  eat: string;
  toilet: string;
  bath: string;
  walk: string;
  story: string;
  togetherTime: number;
}

export const fetchUserDetail = async (userId: number): Promise<UserDetailResponse> => {
  const { data } = await axiosInstance.get(`/user-info/detail/${userId}`);
  return data.data; 
};

export const useUserDetailQuery = (userId: number) => {
  return useQuery<UserDetailResponse, Error>({
    queryKey: ['userDetail', userId], 
    queryFn: () => fetchUserDetail(userId),
    enabled: !!userId,
  });
};