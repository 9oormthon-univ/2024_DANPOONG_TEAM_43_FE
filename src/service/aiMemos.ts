import { useQuery } from '@tanstack/react-query';
import axiosInstance from 'utils/axiosInstance';

export interface MemoDetail {
  id: number;
  description: string;
}

export const fetchMemoDetail = async (userId: number): Promise<MemoDetail> => {
  const response = await axiosInstance.get(`/memo/${userId}`);
  return response.data.data;
};

export const useMemoDetailQuery = (userId: number) => {
  return useQuery<MemoDetail, Error>({
    queryKey: ['memoDetail', userId],
    queryFn: () => fetchMemoDetail(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, 
  });
};

