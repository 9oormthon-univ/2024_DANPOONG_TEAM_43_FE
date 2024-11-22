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

const fetchGuestbookByTab = async (tab: string): Promise<GuestbookEntry[]> => {
    const apiUrl =
      tab === '전체'
        ? '/guestbook/all'
        : tab === '내 집'
        ? '/guestbook/myHome'
        : '/guestbook/caregiverHome';
  
    const response = await axiosInstance.get<{ status: number; data: GuestbookEntry[] }>(apiUrl);
  
    if (response.status !== 200) {
      throw new Error('Failed to fetch guestbook data');
    }
  
    return response.data.data;
  };
  
  export const useGuestbookByTabQuery = (tab: string) =>
    useQuery({
      queryKey: ['guestbookByTab', tab], 
      queryFn: () => fetchGuestbookByTab(tab), 
      staleTime: 5 * 60 * 1000, 
    });

    export const postGuestbookEntry = async (id: number, content: string): Promise<void> => {
    await axiosInstance.post(`/guestbook/${id}`, { content });
    }