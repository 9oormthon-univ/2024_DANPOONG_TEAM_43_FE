import { useQuery } from '@tanstack/react-query';
import axiosInstance from 'utils/axiosInstance';
import { GuestbookEntry } from 'type/guestbook';

export const fetchGuestbook = async (): Promise<GuestbookEntry[]> => {
  const response = await axiosInstance.get<{ status: number; data: GuestbookEntry[] }>(
    '/guestbook/all'
  );

  if (response.status !== 200) {
    throw new Error('Failed to fetch guestbook');
  }

  return response.data.data;
};

export const useGuestbookQuery = () => {
  return useQuery({
    queryKey: ['guestbook'],
    queryFn: fetchGuestbook,
    staleTime: 5 * 60 * 1000,
  });
};