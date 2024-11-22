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
        ? '/guestbook/my-house'
        : '/guestbook/neighbor-house';
  
    const response = await axiosInstance.get<{ status: number; data: GuestbookEntry[] }>(apiUrl);
  
    if (response.status !== 200) {
      throw new Error('Failed to fetch guestbook data');
    }
  
    return response.data.data; // 데이터 반환
  };
  
  // React Query Hook
  export const useGuestbookByTabQuery = (tab: string) =>
    useQuery({
      queryKey: ['guestbook', tab], // 쿼리 키
      queryFn: () => fetchGuestbookByTab(tab), // API 호출 함수
      staleTime: 5 * 60 * 1000, // 5분 동안 캐시 유지
    });