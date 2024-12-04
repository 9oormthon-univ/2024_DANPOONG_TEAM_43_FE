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

  if (data.userType === 'CARE_WORKER' && data.certificationImage) {
    formDataToSubmit.append('file', data.certificationImage);
  }

  try {
    const response = await axiosNoAuthInstance.post('/register', formDataToSubmit, {
      headers: {
        'Content-Type': 'multipart/form-data', 
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('폼 전송 오류');
  }
};