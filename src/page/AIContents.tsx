import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import back from '../assets/img/chat/chat-back.svg';
import ai_siren from '../assets/img/home/AI_siren.svg';
import ai_icon from '../assets/img/home/AI_icon.svg';
import ai_total_fill from '../assets/img/home/AI_total_fill.svg';
import ai_chat_fill from '../assets/img/home/AI_chat_fill.svg';
import ai_eat_fill from '../assets/img/home/AI_eat_fill.svg';
import ai_active_fill from '../assets/img/home/AI_active_fill.svg';
import ai_tem_fill from '../assets/img/home/AI_tem_fill.svg';
import ai_toilet_fill from '../assets/img/home/AI_toilet_fill.svg';
import ai_total from '../assets/img/home/AI_total.svg';
import ai_chat from '../assets/img/home/AI_chat.svg';
import ai_eat from '../assets/img/home/AI_eat.svg';
import ai_active from '../assets/img/home/AI_active.svg';
import ai_tem from '../assets/img/home/AI_tem.svg';
import ai_toilet from '../assets/img/home/AI_toilet.svg';
import AIProfile from 'components/home/AIProfile';
import { useUserDataQuery } from 'service/user';
import axiosInstance from '../utils/axiosInstance';

const AIContents: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { caregiverId, id, caregiverName } = location.state || {};
  const { data: userData } = useUserDataQuery();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState<string>('total');
  const [conditionText, setConditionText] = useState<string>('total');
  const [memoData, setMemoData] = useState<any>(null);
  const [textareaContent, setTextareaContent] = useState<string>('');

  const userType = userData?.userType;

  const handleCloseModal = () => setIsModalOpen(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setTimeout(() => setIsModalVisible(true), 0);
  };

  const handleBackClick = () => navigate(-1);

  const getTypeFillStyle = () => {
    if (userType === 'VOLUNTEER') return { background: '#00AEFF' };
    if (userType === 'CARE_WORKER') return { background: '#20CE86' };
    return {};
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaContent(e.target.value);
  };

  const handleSubmitMemo = async () => {
    if (!textareaContent.trim()) {
      alert('메모를 작성해주세요!');
      return;
    }

    try {
      const response = await axiosInstance.post('/memo', {
        volunteerId: id,
        content: textareaContent,
      });

      if (response.status === 200) {
        alert('메모가 성공적으로 저장되었습니다!');
        navigate(-1);
      }
    } catch (error) {
      console.error('Failed to submit memo:', error);
      alert('메모 전송 중 문제가 발생했습니다. 다시 시도해주세요.');
    }
  };

  useEffect(() => {
    const fetchMemoData = async () => {
      try {
        const response = await axiosInstance.get(`/memo/${caregiverId}`);
        setMemoData(response.data.data);
        setConditionText(response.data.data?.all || '');
      } catch (error) {
        console.error('Failed to fetch memo data:', error);
      }
    };

    fetchMemoData();
  }, [caregiverId]);

  const handleConditionClick = (key: string, text: string) => {
    setSelectedCondition(key);
    if (memoData) {
      const conditionTextMapping: { [key: string]: string } = {
        total: memoData.all,
        tem: memoData.healthy,
        eat: memoData.eat,
        active: memoData.additionalHealth,
        chat: memoData.social,
        toilet: memoData.voiding,
      };
      setConditionText(conditionTextMapping[key] || text);
    }
  };

  return (
    <div className="container" id="ai_contents">
      <div className="between">
        <div className="top">
          <img src={back} alt="" onClick={handleBackClick} />
          <p className="top_title">
            <div className="type" style={getTypeFillStyle()}></div>
            {caregiverName}님과의 인연
          </p>
          <img src={ai_siren} alt="" />
        </div>

        <div className="middle">
          <div className="middle_top">
            <img src={ai_icon} alt="" className="AI_icon" />
            <p className="condition">체온 및 건강 상태</p>
          </div>
          <div className="condition_icon">
            {[
              { key: 'total', defaultIcon: ai_total, fillIcon: ai_total_fill },
              { key: 'tem', defaultIcon: ai_tem, fillIcon: ai_tem_fill },
              { key: 'eat', defaultIcon: ai_eat, fillIcon: ai_eat_fill },
              { key: 'active', defaultIcon: ai_active, fillIcon: ai_active_fill },
              { key: 'chat', defaultIcon: ai_chat, fillIcon: ai_chat_fill },
              { key: 'toilet', defaultIcon: ai_toilet, fillIcon: ai_toilet_fill },
            ].map((condition) => (
              <div
                key={condition.key}
                className={condition.key}
                onClick={() => handleConditionClick(condition.key, ' ')}
                style={{
                  backgroundImage: `url(${
                    selectedCondition === condition.key ? condition.fillIcon : condition.defaultIcon
                  })`,
                }}
              ></div>
            ))}
          </div>
          <p className="condition_text">{conditionText}</p>
        </div>

        <hr />

        <div className="memo_div">
          <div className="title">메모</div>
          <textarea
            name="memo"
            id="memo"
            placeholder="간병인의 특이사항이 있을 경우, 적어주세요!"
            value={textareaContent}
            onChange={handleTextareaChange}
          ></textarea>
        </div>
      </div>

      <div>
        <div className="profile_contents">
          <div className="open" onClick={handleOpenModal}>
            <div className="bar"></div>
          </div>
        </div>

        <div className="bottom">
          <div id="box" className="chat_room">
            간병인과 연락하기
          </div>
          <div id="box" className="detail" onClick={handleSubmitMemo}>
            봉사 끝마치기
          </div>
        </div>
      </div>

      {isModalOpen && <AIProfile userId={caregiverId} onClose={handleCloseModal} />}
    </div>
  );
};

export default AIContents;