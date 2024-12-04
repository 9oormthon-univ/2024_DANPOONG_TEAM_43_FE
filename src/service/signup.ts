import axiosNoAuthInstance from 'utils/axiosNoAuthInstance';

export const registerUser = async (data: any): Promise<any> => {
  const formDataToSubmit = new FormData();

  const identity = `${data.identityFront}${data.identityBack}`;
  formDataToSubmit.append(
    'registerDTO', 
    JSON.stringify({
      kakaoId: data.kakaoId,
      userType: data.userType,
      username: data.username,
      phoneNum: data.phoneNum,
      address: data.address,
      detailAddress: data.detailAddress,
      talk: data.talk,
      eat: data.eat,
      toilet: data.toilet,
      bath: data.bath,
      walk: data.walk,
      story: data.story,
      shareLocation: data.shareLocation,
      identity: identity,
    })
  );

  // 파일이 있다면 'file' 파라미터로 전송
  if (data.userType === 'CARE_WORKER' && data.certificationImage) {
    formDataToSubmit.append('file', data.certificationImage);
  }

  try {
    const response = await axiosNoAuthInstance.post('/register', formDataToSubmit, {
      headers: {
        'Content-Type': 'multipart/form-data', // 자동으로 설정되긴 하지만 명시적으로 추가 가능
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('폼 전송 오류');
  }
};