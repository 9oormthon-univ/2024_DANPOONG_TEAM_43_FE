export interface KakaoLoginResponseData {
    kakaoId?: string;
    nickname?: string;
    [key: string]: any; 
  }
  
  export interface KakaoLoginResponse {
    status: number;
    data: KakaoLoginResponseData;
  }