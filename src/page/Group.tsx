import React, { useState, useEffect } from 'react';
import MyGroupMain from 'components/group/MyGroupMain';
import OtherGroup from 'components/group/OtherGroup';

const Group = () => {
  const initialTab = sessionStorage.getItem('activeTab') as 'mygroup' | 'other' || 'mygroup';
  const [activeTab, setActiveTab] = useState<'mygroup' | 'other'>(initialTab);
  const [groupId, setGroupId] = useState<number>(0); 

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
      {activeTab === 'mygroup' && <MyGroupMain pagegroupId={groupId} />}
      {activeTab === 'other' && <OtherGroup />}
    </div>
  );
};

export default Group;
