import React from 'react';

interface UserGreetingProps {
  username: string;
  userType: string;
}

const UserGreeting: React.FC<UserGreetingProps> = ({ username, userType }) => {
  const getGreetingMessage = () => {
    switch (userType) {
      case 'CAREGIVER':
        return (
          <>
            안녕하세요 {username}님, <br />내 주변 도움을 받아보세요!
          </>
        );
      case 'VOLUNTEER':
        return (
          <>
            안녕하세요 {username}님, <br />내 주변 도움이 필요하신 분을 찾아보세요!
          </>
        );
      case 'CARE_WORKER':
        return (
          <>
            안녕하세요 {username}님, <br />내 주변 간병 이웃을 찾아보세요!
          </>
        );
      default:
        return (
          <>
            안녕하세요 {username}님, <br />내 주변 도움을 받아보세요!
          </>
        );
    }
  };

  return (
    <div className="mt-[36px] mb-[24px]">
      <div className="text-[#2a2e36] text-xl font-semibold font-['Pretendard'] leading-7">
        {getGreetingMessage()}
      </div>
    </div>
  );
};

export default UserGreeting;