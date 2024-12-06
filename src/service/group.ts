import axiosInstance from 'utils/axiosInstance';

export interface GroupData {
  groupId: number;
  groupName: string;
  city: string;
  headCount: number;
  groupImage: string;
  isJoined: boolean;
}

export interface FeedData {
  newsId: number;
  title: string;
  content: string;
  writerType: string;
  createdAt: string;
  writerId: number;
  commentCount: number;
}

export interface MemoryData {
    memoryId: number;
    content: string;
    createdAt: string;
    otherType: {
      userType: 'VOLUNTEER' | 'CARE_WORKER';
      userId: number;
      username: string;
      content: string;
    };
    caregiver: {
      userType: string;
      userId: number;
      username: string;
      content: string;
    };
  }
  

export const fetchGroupData = async (groupId?: number): Promise<GroupData> => {
  const response = groupId
    ? await axiosInstance.get(`/group/detail/${groupId}`)
    : await axiosInstance.get('/group');
  return groupId ? response.data.data : response.data.data[0];
};

export const fetchFeedData = async (groupId: number): Promise<FeedData[]> => {
  const response = await axiosInstance.get(`/news/group/${groupId}`);
  return response.data.data.slice(0, 3);
};

export const fetchMemories = async (groupId: number): Promise<MemoryData[]> => {
  const response = await axiosInstance.get(`/guestbook/group/${groupId}`);
  return response.data.data.slice(0, 2);
};

export const leaveGroup = async (groupId: number): Promise<void> => {
  await axiosInstance.post(`/group/leave/${groupId}`);
};
