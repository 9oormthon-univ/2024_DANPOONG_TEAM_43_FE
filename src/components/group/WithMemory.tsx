import React from 'react'
import profile from '../../assets/img/user/type1-1.svg'
import worker_bg from '../../assets/img/group/memory_worker_bg_img.svg'
import volunteer_bg from '../../assets/img/group/memory_volunteer_bg_img.svg'
import giver_bg from '../../assets/img/group/memory_giver_bg_img.svg'
import { getBackgroundColor2, getUserImage } from 'utils/userUtils';

interface WithMemoryProps {
  memory: WithMemoryPropsType;
}
interface WithMemoryPropsType {
  otherType: WithMemoryPropsInfo;
  caregiver: WithMemoryPropsInfo;
}
interface WithMemoryPropsInfo {
  username: string;
  userType: string;
  content: string;
  userId: number;
}

const WithMemory: React.FC<WithMemoryProps> = ({ memory }) => {
  const getBackgroundImage = () => {
    if(memory.otherType.userType == 'VOLUNTEER')
      return volunteer_bg;
    else if(memory.otherType.userType == 'CARE_WORKER')
      return worker_bg;
  };
  const getBackType = () => {
    switch (memory.caregiver.userType) {
      case 'CARE_WORKER':
        return '요양보호사';
      case 'VOLUNTEER':
        return '자원봉사자';
      default:
        return '';
    }
  };

  return (
    <div className='with_memory_div'>
      <div className="other_type">
        <img src={getBackgroundImage()} alt="" className='back_img' />
        <img src={getUserImage(memory.otherType.userId,memory.otherType.userType)} alt="" className="profile" 
        style={{
          border: `2px solid ${getBackgroundColor2(memory.otherType.userType)}`,
        }}/>
        <div className="memory_text">
          <p className="name">{getBackType()} {memory.otherType.username}님</p>
          <p className="text">{memory.otherType.content}</p>
        </div>
      </div>
      <div className="giver_type">
        <img src={giver_bg} alt="" className='back_img' />
        <div className="memory_text">
          <p className="name">간병인 {memory.caregiver.username}님</p>
          <p className="text">{memory.caregiver.content}</p>
        </div>
        <img src={getUserImage(memory.caregiver.userId,memory.caregiver.userType)} alt="" className="profile" 
        style={{
          border: `2px solid ${getBackgroundColor2(memory.caregiver.userType)}`,
        }}/>
      </div>
    </div>
  )
}

export default WithMemory