import React from 'react';

interface UserGreetingProps {
  username: string;
  userType: string;
}

const UserGreeting: React.FC<UserGreetingProps> = ({ username, userType }) => {
  const greetingMessages: { [key: string]: string } = {
    CAREGIVER: `안녕하세요 ${username}님, \n내 주변 도움을 받아보세요!`,
    VOLUNTEER: `안녕하세요 ${username}님, \n내 주변 도움이 필요하신 분을 찾아보세요!`,
    CARE_WORKER: `안녕하세요 ${username}님, \n내 주변 간병 이웃을 찾아보세요!`,
    DEFAULT: `안녕하세요 ${username}님, \n내 주변 도움을 받아보세요!`,
  };

  const message = greetingMessages[userType] || greetingMessages['DEFAULT'];

  return (
    <div className="mt-[36px] mb-[24px]">
      <div className="text-[#2a2e36] text-xl font-semibold font-['Pretendard'] leading-7 whitespace-pre-wrap">
        {message}
      </div>
    </div>
  );
};

export default UserGreeting;