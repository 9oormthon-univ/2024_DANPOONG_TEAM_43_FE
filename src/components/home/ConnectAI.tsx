import React from 'react'
import next from '../../assets/img/home/Ai_next.svg'
import type1_1 from '../../assets/img/user/type1-1.svg';
import AI_icon from '../../assets/img/home/AI_icon.svg'
import { useNavigate } from "react-router-dom";

const ConnectAI = () => {
    const navigate = useNavigate();
    const GoToAI = () => {
        navigate('/ai-contents');
    }
    return (
        <div className='Connect_AI'>
            <div className="outbox">
                <div className="top">
                    <img src={type1_1} alt="" className="profile" />
                    <div className="text">
                        <p className="top_title">이상덕님과의 약속 <img src={next} alt="" className="next" onClick={GoToAI}/></p>
                        <p className="when">2024년 10월 27일 03:30</p>
                    </div>
                    
                </div>
                <div className="middle">
                    <img src={AI_icon} alt="" className="AI_img" />
                    <p className="AI_info">이상덕님의 간병 정보를 요약해 드려요</p>
                </div>
                <p className="AI_text">투약은 하루 2번, 아침 10시와 저녁 6시에 진행합니다. 또한, 복약 후에는 환자 상태를 세심하게 관찰하여 이상 반응이 없는지 확인해야 합니다. 식사는 매일 아침 8시와 저녁 5시에 급여됩니다. 식단은 계란과 우유를 필수로 급여해야합니다. 필요한 경우 추가적인 수분 보충을 권장합니다.</p>
            </div>
        </div>
    )
}

export default ConnectAI