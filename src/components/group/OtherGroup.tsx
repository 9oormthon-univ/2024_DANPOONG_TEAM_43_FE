import React from 'react';
import heart from '../../assets/img/group/group_heart_icon.svg';
import GroupList from './GroupList';
import { useGroupsQuery } from 'service/useGroupQueries';

const OtherGroup: React.FC = () => {
  const { data: groups = [], isLoading, isError } = useGroupsQuery();

  if (isLoading) {
    return null;
  }

  if (isError) {
    return null;
  }

  return (
    <div className='other_group'>
      <div className="group_list">
        {groups.length > 0 ? (
          groups.map((group, index) => (
            <React.Fragment key={group.groupId}>
              <GroupList
                groupId={group.groupId}
                title={group.groupName}
                location={group.city}
                headCount={group.headCount}
                lastNews={group.lastNews}
                groupImage={group.groupImage}
              />
              {index !== groups.length - 1 && <hr />}
            </React.Fragment>
          ))
        ) : (
          null
        )}
      </div>
      <div className="no_group_div">
        <div className="no_group">
          <p className="text">원한는 모임이 없나요?</p>
          <div className="new_group">
            <img src={heart} alt="" className="heart" />
            <p className="txt">모임 만들기</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherGroup;
