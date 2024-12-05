import React from 'react'
import { getBackgroundColor2, getUserImage, userTypeConfig } from 'utils/userUtils';
import { NeighborListProps } from 'type/group'

const NeighborList: React.FC<NeighborListProps> = ({ username, userType, userId }) => {
  const config = userTypeConfig[userType] || {};
  return (
    <div className='neighbor_list' style={{ backgroundColor: config.bgColor }}>
        <img src={config.bgImg} alt="" className='bg_img'/>
        <img src={getUserImage(userId, userType)} alt="" className='profile' style={{
            border: `1px solid ${getBackgroundColor2(userType)}`,
          }}/>
        <p className="name">{config.label} {username}</p>
    </div>
  )
}

export default NeighborList