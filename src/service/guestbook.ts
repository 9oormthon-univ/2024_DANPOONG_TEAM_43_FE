import { useQuery } from '@tanstack/react-query';
import axiosInstance from 'utils/axiosInstance';
import { GuestbookEntry } from 'type/guestbook';

export const fetchGuestbook = async (): Promise<GuestbookEntry[]> => {
  const response = await axiosInstance.get<{ status: number; data: GuestbookEntry[] }>(
    '/guestbook/myPage'
  );

  if (response.status !== 200) {
    throw new Error('Failed to fetch guestbook');
  }

  return response.data.data.map((entry) => ({
    ...entry,
    volunteerSessionId: Number(entry.volunteerSessionId),
  }));
};

export const postGuestbookEntry = async (
  id: number,
  content: string
): Promise<{ status: number; data: any }> => {
  const response = await axiosInstance.post(`/guestbook/${id}`, { content });

  if (response.status === 201 || response.status === 200) {
    return response;
  }

  throw new Error('Failed to create guestbook entry');
};

export const useGuestbookQuery = () => {
  return useQuery<GuestbookEntry[]>({
    queryKey: ['guestbook'],
    queryFn: fetchGuestbook,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};