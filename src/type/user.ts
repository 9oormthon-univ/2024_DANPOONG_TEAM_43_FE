export type UserType = 'CAREGIVER' | 'VOLUNTEER' | 'CARE_WORKER';

export interface UserData {
  userId: number;
  username: string;
  age: number;
  phoneNum: string;
  city: string;
  address: string;
  detailAddress: string;
  locationAuthentication: boolean;
  userType: UserType;
  shareLocation: boolean;
  talk: string;
  eat: string;
  toilet: string;
  bath: string;
  walk: string;
  story: string;
}

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