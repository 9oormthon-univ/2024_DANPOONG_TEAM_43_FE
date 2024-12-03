import React, { useEffect, useState } from 'react';
import axiosInstance from 'utils/axiosInstance';
import heart from '../../assets/img/group/group_heart_icon.svg'
import GroupList from './GroupList'

const OtherGroup = () => {
  const [groups, setGroups] = useState<any[]>([]); // API로부터 받은 그룹 리스트

  useEffect(() => {
    // API 호출
    const fetchGroups = async () => {
      try {
        const response = await axiosInstance.get('/group/list');
        setGroups(response.data.data); // 데이터 상태에 저장
      } catch (error) {
        console.error('Failed to fetch group list', error);
      }
    };

    fetchGroups();
  }, []);
  return (
    <div className='other_group'>
      <div className="group_list">
      {groups.length > 0 ? (
          groups.map((group, index) => (
            <React.Fragment key={group.groupId}>
              <GroupList
                title={group.groupName}
                location={group.city}
                headCount={group.headCount}
                lastNews={group.lastNews}
              />
              {/* 마지막 항목이 아니라면 <hr /> 렌더링 */}
              {index !== groups.length - 1 && <hr />}
            </React.Fragment>
          ))
        ) : (
          <p>모임 정보를 불러오는 중입니다...</p>
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
  )
}

export default OtherGroup