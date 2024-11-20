import axiosInstance from "utils/axiosInstance";

export const checkLocationAuthentication = async (): Promise<{
    status: number;
    code: string;
    message: string;
    data: {
      userId: number;
      username: string;
      userType: string;
      locationAuthentication: boolean;
    };
  }> => {
    const response = await axiosInstance.get('/verify-authentication');
    return response.data;
  };


export const verifyLocationAuthentication = async (address: string, detailAddress: string) => {
    try {
      const response = await axiosInstance.post('/verify-authentication', {
        address,
        detailAddress,
      });
      return response.data;
    } catch (error) {
      console.error('Location authentication failed', error);
      throw error;
    }
  };
