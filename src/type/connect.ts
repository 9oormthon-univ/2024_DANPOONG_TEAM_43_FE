export interface ConnectAPIRequest {
    phoneNum: string;
    username: string;
    issueDate: string;
    identity: string;
  }
  
export interface ConnectAPIResponse {
    status: number;
    code: string;
    message: string;
    data: null;
  }