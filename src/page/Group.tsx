import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import group_icon from '../assets/img/group/group_popup_icon.svg'
import MyGroupMain from 'components/group/MyGroupMain';
import OtherGroup from 'components/group/OtherGroup';

const Group = () => {
  const location = useLocation(); // 현재 위치 가져오기
  const navigate = useNavigate();
  const initialTab = sessionStorage.getItem('activeTab') as 'mygroup' | 'other' || 'mygroup';
  const [activeTab, setActiveTab] = useState<'mygroup' | 'other'>(initialTab);
  const [groupId, setGroupId] = useState<number>(0); 
  const [refreshKey, setRefreshKey] = useState<number>(0); // 리렌더링 트리거

  useEffect(() => {
    setRefreshKey((prev) => prev + 1); // location 변경 시 리렌더링
  }, [location]);

  const handleTabChange = (tab: 'mygroup' | 'other') => {
    setActiveTab(tab);
    sessionStorage.setItem('activeTab', tab);
  };

  return (
    <div className='container' id='group'>
      <div className="page_title_div">
        <div 
          className={`${activeTab === 'mygroup' ? 'active' : 'no'} cursor-pointer`}
          onClick={() => handleTabChange('mygroup')}
        >
          내 모임
        </div>
        <div 
          className={`${activeTab === 'other' ? 'active' : 'no'} cursor-pointer`}
          onClick={() => handleTabChange('other')}
        >
          이웃 모임 둘러보기
        </div>
      </div>
      {/* 탭에 따라 다른 컴포넌트 렌더링 */}
      {activeTab === 'mygroup' && <MyGroupMain key={refreshKey} pagegroupId={groupId} />}
      {activeTab === 'other' && <OtherGroup />}
    </div>
  );
};

export default Group;
