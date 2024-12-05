import { useQuery } from '@tanstack/react-query';
import axiosInstance from 'utils/axiosInstance';

export const fetchVolunteerHours = async (userId: number): Promise<number> => {
  const response = await axiosInstance.get('/api/certificates/total-volunteer-hours', {
    params: { userId },
  });
  return response.data;
};

export const useVolunteerHoursQuery = (userId: number | undefined) => {
    return useQuery<number, Error>({
      queryKey: ['volunteerHours', userId],
      queryFn: () => fetchVolunteerHours(userId!),
      enabled: !!userId, 
      staleTime: 1000 * 60 * 5,
    });
  };