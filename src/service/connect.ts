import { ConnectAPIRequest, ConnectAPIResponse } from 'type/connect';
import axiosNoAuthInstance from 'utils/axiosNoAuthInstance';

export const connectAPI = async (data: ConnectAPIRequest): Promise<ConnectAPIResponse> => {
  const response = await axiosNoAuthInstance.post<ConnectAPIResponse>('/connect', data);
  return response.data;
};