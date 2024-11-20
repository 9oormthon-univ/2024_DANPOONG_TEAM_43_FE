export interface NeighborUser {
    userId: number;
    username: string;
    userType: string;
    timeTogether: number;
    address: string;
    latitude: number;
    longitude: number;
    km: number;
  }
  
  export interface NeighborSuggestionsResponse {
    status: number;
    code: string;
    message: string;
    data: NeighborUser[];
  }