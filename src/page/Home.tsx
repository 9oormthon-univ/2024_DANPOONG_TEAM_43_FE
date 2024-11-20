import React from 'react';
import UserGreeting from 'components/home/UserGreeting';
import UserInfoCard from 'components/home/UserInfoCard';
import NeighborSuggestions from 'components/home/NeighborSuggestions';
import MapSection from 'components/home/MapSection';
import Memories from 'components/home/Memories';
import { useUserDataQuery } from 'service/user';
import caregiverBg from '../assets/img/home/main-caregiver.svg';
import volunteerBg from '../assets/img/home/main-volunteer.svg';
import careWorkerBg from '../assets/img/home/main-careworker.svg';

const Home: React.FC = () => {
  const { data: userData, isLoading } = useUserDataQuery();

  if (isLoading) {
    return null;
  }

  if (!userData) {
    return null;
  }

  const backgroundSettings = {
    CAREGIVER: { color: 'bg-[#ffe5e5]', image: caregiverBg },
    VOLUNTEER: { color: 'bg-[#eef7ff]', image: volunteerBg },
    CARE_WORKER: { color: 'bg-[#d8fbed]', image: careWorkerBg },
  };

  const { color, image } = backgroundSettings[userData.userType] || backgroundSettings['CAREGIVER'];

  return (
    <div className={`relative ${color} max-w-[440px] min-w-[340px] w-full mx-auto overflow-y-auto min-h-screen pb-8`}>
      <img
        src={image}
        alt="UserType Background"
        className="absolute top-[3.8rem] right-[-140px] w-[100%] h-auto"
        style={{ objectFit: 'cover', objectPosition: 'left' }}
      />
      <div className="w-full mx-auto relative z-10">
        <div className='w-[90%] mx-auto'>
        <UserGreeting username={userData.username} userType={userData.userType} />
        </div>
        <div className='w-[90%] mx-auto'>
        <UserInfoCard userType={userData.userType} city={userData.city} />
        </div>
        <NeighborSuggestions />
        <div className='w-[90%] mx-auto'>
        <MapSection userData={userData} />
        </div>
        <div className='w-[90%] mx-auto'>
        <Memories />
        </div>
      </div>
    </div>
  );
};

export default Home;