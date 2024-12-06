import { UserType } from 'type/user';

export interface FeedCommentProps {
    writerType: string;
    writer: string;
    createdAt: string;
    content: string;
    writerId:number;
  }

export interface UserTypeConfig {
    CAREGIVER: { label: string };
    VOLUNTEER: { label: string };
    CARE_WORKER: { label: string };
  }


export interface FeedPreviewProps {
    title: string;
    content: string;
    writerType: string;
    createdAt: string;
    newsId:number;
    commentCount:number;
    writerId:number;
  }

export interface GroupListProps {
    title: string;
    location: string;
    headCount: number;
    lastNews: string;
    groupImage:string;
    groupId:number;
}

export interface NeighborListProps {
  username: string;
  userType: UserType;
  userId: number;
}

export interface WithMemoryProps {
  memory: WithMemoryPropsType;
}

export interface WithMemoryPropsType {
  otherType: WithMemoryPropsInfo;
  caregiver: WithMemoryPropsInfo;
}

export interface WithMemoryPropsInfo {
  username: string;
  userType: string;
  content: string;
  userId: number;
}

export interface GroupDetailId {
  pagegroupId: number;
}