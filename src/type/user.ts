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