export interface CertificateResponse {
    status: number;
    code: string;
    message: string;
    data: {
      name: string;
      birth: string;
      certificateNum: string;
      certificateType: string;
      certificateDate: string;
      certificateName: string;
    };
  }
  
  export interface CertificateError {
    status: number;
    code: string;
    message: string;
  }