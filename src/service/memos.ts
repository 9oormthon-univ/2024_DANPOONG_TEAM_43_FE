import { useQuery } from '@tanstack/react-query';
import { MemoData } from 'type/memo';
import axiosInstance from 'utils/axiosInstance';

export const fetchVolunteerData = async (): Promise<MemoData[]> => {
    const response = await axiosInstance.get('/memo/not-written');
    return response.data.data;
  };
  
  export const useVolunteerDataQuery = () => {
    return useQuery<MemoData[], Error>({
      queryKey: ['volunteerData'],
      queryFn: fetchVolunteerData,
      staleTime: 1000 * 60 * 5, 
      retry: 1, 
    });
  };