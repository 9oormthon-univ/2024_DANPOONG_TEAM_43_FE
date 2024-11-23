import { useMutation } from '@tanstack/react-query';
import axiosInstance from 'utils/axiosInstance';
import { CertificateResponse, CertificateError } from 'type/certificate';

export const uploadCertificate = async (file: File): Promise<CertificateResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axiosInstance.post<CertificateResponse>('/certificates/extract', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const useUploadCertificate = (
  onSuccess: (data: CertificateResponse) => void,
  onError: (error: CertificateError) => void
) => {
  return useMutation<CertificateResponse, CertificateError, File>({
    mutationFn: uploadCertificate, 
    onSuccess,
    onError,
  });
};