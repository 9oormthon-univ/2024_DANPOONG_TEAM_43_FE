import { useMutation } from '@tanstack/react-query';
import axiosNoAuthInstance from 'utils/axiosNoAuthInstance';
import { CertificateResponse, CertificateError } from 'type/certificate';

export const uploadCertificate = async (
  formData: FormData
): Promise<CertificateResponse> => {
  const response = await axiosNoAuthInstance.post<CertificateResponse>(
    '/certificates/extract',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data;
};

export const useUploadCertificate = (
  onSuccess?: (data: CertificateResponse) => void,
  onError?: (error: CertificateError) => void
) => {
  return useMutation<CertificateResponse, CertificateError, FormData>({
    mutationFn: uploadCertificate,
    onSuccess: (data) => {
      console.log('Certificate uploaded successfully:', data);
      if (onSuccess) onSuccess(data);
    },
    onError: (error) => {
      console.error('Error uploading certificate:', error);
      if (onError) onError(error);
    },
  });
};