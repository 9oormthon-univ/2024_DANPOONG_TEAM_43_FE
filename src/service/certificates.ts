import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { CertificateResponse, CertificateError } from 'type/certificate';

export const uploadCertificate = async (formData: FormData): Promise<CertificateResponse> => {
  const response = await axios.post<CertificateResponse>('https://carely-backend.site/certificates/extract', formData, {
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
  return useMutation<CertificateResponse, CertificateError, FormData>({
    mutationFn: uploadCertificate,
    onSuccess,
    onError,
  });
};