export interface mapUser {
  username: any;
  userId: number;
  story: string;
  userType: string;
  city: string;
  address: string;
  detailAddress: string;
  latitude: number; 
  longitude: number;
  km: number;
}

export interface UserListResponse {
  status: number;
  code: string;
  message: string;
  data: mapUser[];
}