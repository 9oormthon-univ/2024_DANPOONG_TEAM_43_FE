import React, { useEffect, useRef, useState } from 'react';

import caregiverProfile from '../../assets/img/mypage/profile-caregiver.svg';
import volunteerProfile from '../../assets/img/mypage/profile-volunteer.svg';
import careWorkerProfile from '../../assets/img/mypage/profile-careworker.svg';
import talkIcon1 from '../../assets/img/map/talk1.svg';
import eatIcon1 from '../../assets/img/map/eat1.svg';
import toiletIcon1 from '../../assets/img/map/toilet1.svg';
import bathIcon1 from '../../assets/img/map/bath1.svg';
import walkIcon1 from '../../assets/img/map/walk1.svg';
import talkIcon2 from '../../assets/img/map/talk2.svg';
import eatIcon2 from '../../assets/img/map/eat2.svg';
import toiletIcon2 from '../../assets/img/map/toilet2.svg';
import bathIcon2 from '../../assets/img/map/bath2.svg';
import walkIcon2 from '../../assets/img/map/walk2.svg';
import talkIcon3 from '../../assets/img/map/talk3.svg';
import eatIcon3 from '../../assets/img/map/eat3.svg';
import toiletIcon3 from '../../assets/img/map/toilet3.svg';
import bathIcon3 from '../../assets/img/map/bath3.svg';
import walkIcon3 from '../../assets/img/map/walk3.svg';
import leftButtonIcon from '../../assets/img/sign/sign-left-btn.svg';
import friendIcon from '../../assets/img/map/friend.svg';
import basketIcon from '../../assets/img/map/basket.svg';
import { useUserDetailQuery } from 'service/user';
import type1_1 from '../../assets/img/user/type1_1.svg';
import type1_2 from '../../assets/img/user/type1_2.svg';
import type1_3 from '../../assets/img/user/type1_3.svg';
import type1_4 from '../../assets/img/user/type1_4.svg';
import type1_5 from '../../assets/img/user/type1_5.svg';
import type1_6 from '../../assets/img/user/type1_6.svg';
import type1_7 from '../../assets/img/user/type1_7.svg';
import type1_8 from '../../assets/img/user/type1_8.svg';
import type1_9 from '../../assets/img/user/type1_9.svg';
import type1_10 from '../../assets/img/user/type1_10.svg';
import type2_1 from '../../assets/img/user/type2_1.svg';
import type2_2 from '../../assets/img/user/type2_2.svg';
import type2_3 from '../../assets/img/user/type2_3.svg';
import type2_4 from '../../assets/img/user/type2_4.svg';
import type2_5 from '../../assets/img/user/type2_5.svg';
import type2_6 from '../../assets/img/user/type2_6.svg';
import type2_7 from '../../assets/img/user/type2_7.svg';
import type2_8 from '../../assets/img/user/type2_8.svg';
import type2_9 from '../../assets/img/user/type2_9.svg';
import type2_10 from '../../assets/img/user/type2_10.svg';
import type3_1 from '../../assets/img/user/type3_1.svg';
import type3_2 from '../../assets/img/user/type3_2.svg';
import type3_3 from '../../assets/img/user/type3_3.svg';
import type3_4 from '../../assets/img/user/type3_4.svg';
import type3_5 from '../../assets/img/user/type3_5.svg';
import type3_6 from '../../assets/img/user/type3_6.svg';
import type3_7 from '../../assets/img/user/type3_7.svg';
import type3_8 from '../../assets/img/user/type3_8.svg';
import type3_9 from '../../assets/img/user/type3_9.svg';
import type3_10 from '../../assets/img/user/type3_10.svg';
import axiosInstance from 'utils/axiosInstance';
import { useNavigate } from "react-router-dom";


const imageMapping: { [key: string]: string[] } = {
    CAREGIVER: [type1_1, type1_2, type1_3, type1_4, type1_5, type1_6, type1_7, type1_8, type1_9, type1_10],
    CARE_WORKER: [type2_1, type2_2, type2_3, type2_4, type2_5, type2_6, type2_7, type2_8, type2_9, type2_10],
    VOLUNTEER: [type3_1, type3_2, type3_3, type3_4, type3_5, type3_6, type3_7, type3_8, type3_9, type3_10],
};

interface UserDetailModalProps {
    userId: number;
    onClose: () => void;
}

const AIProfile: React.FC<UserDetailModalProps> = ({ userId,onClose }) => {
    const { data: user, isLoading, isError } = useUserDetailQuery(userId);

    const [isExpanded, setIsExpanded] = useState(false);
    const [isClamped, setIsClamped] = useState(false);
    const storyRef = useRef<HTMLParagraphElement>(null);

    const getUserImage = (userId: number, userType: string): string => {
        const images = imageMapping[userType];
        if (!images) return '';

        const index = userId % 10;
        return images[index];
    };

    const toggleExpanded = () => setIsExpanded((prev) => !prev);

    useEffect(() => {
        if (storyRef.current) {
            const { scrollHeight, offsetHeight } = storyRef.current;
            setIsClamped(scrollHeight > offsetHeight);
        }
    }, [user?.story]);

    const getIconPath = (icon: string): string => {
        if (!user) return talkIcon1;

        switch (user.userType) {
            case 'CAREGIVER':
                switch (icon) {
                    case 'walk': return walkIcon1;
                    case 'eat': return eatIcon1;
                    case 'toilet': return toiletIcon1;
                    case 'bath': return bathIcon1;
                    default: return talkIcon1;
                }
            case 'VOLUNTEER':
                switch (icon) {
                    case 'walk': return walkIcon2;
                    case 'eat': return eatIcon2;
                    case 'toilet': return toiletIcon2;
                    case 'bath': return bathIcon2;
                    default: return talkIcon2;
                }
            case 'CARE_WORKER':
                switch (icon) {
                    case 'walk': return walkIcon3;
                    case 'eat': return eatIcon3;
                    case 'toilet': return toiletIcon3;
                    case 'bath': return bathIcon3;
                    default: return talkIcon3;
                }
            default:
                return talkIcon1;
        }
    };

    const getBackgroundColor = (userType: string | undefined): string => {
        switch (userType) {
            case 'CAREGIVER':
                return 'bg-[#fff1f1]';
            case 'VOLUNTEER':
                return 'bg-[#eff9ff]';
            case 'CARE_WORKER':
                return 'bg-[#ebfef4]';
            default:
                return 'bg-white';
        }
    };

    if (isLoading) {
        return null;
    }

    if (isError || !user) {
        return null;
    }

    return (
        <div className='profile-container'>
            <div className='profile-content'>
                <div className="open" onClick={onClose}>
                    <div className="bar"></div>

                </div>
                <div className="mx-auto max-w-[440px] w-[90%]">
                    {/* 유저 정보 섹션 */}
                    <div className='profile-header'>
                        <img
                            src={getUserImage(user.userId, user.userType)}
                            alt="User Profile"
                            className="profile-image"
                        />
                        <div className="profile-info">
                            <div className="profile-info">{user.username}</div>
                            <div className="profile-age">나이 {user.age}세</div>
                            <div className="profile-city">{user.city}</div>
                            <div className="profile-time">
                                <img src={basketIcon} alt="Basket" className="w-4 h-4" />
                                <span className="text-[#ff4d6c] text-xs font-medium">
                                    Carely와 함께한 시간 {user.togetherTime}시간
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* 활동 가능 아이콘 섹션 */}
                    <div className="profile-activities">
                        <h3 className="text-[#2a2e36] text-xl font-semibold leading-7 mb-6">
                            {user.userType === 'CAREGIVER' ? '제가 모시는 분은,' : '제가 할 수 있는 일은,'}
                        </h3>
                        <div className="activity-icons">
                            {['talk', 'eat', 'toilet', 'bath', 'walk'].map((icon) => (
                                <div className="activity-item" key={icon}>
                                    <img
                                        src={getIconPath(icon)}
                                        alt={icon}
                                        className="w-[64px] h-[64px]"
                                    />
                                    <span className="text-sm mt-2">
                                        {(user as unknown as Record<string, string>)[icon] || '정보 없음'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 나의 이야기 섹션 */}
                    <div className="profile-story">
                        <h3 className="text-[#2a2e36] text-xl font-semibold leading-7 mb-6">나의 이야기</h3>
                        <p
                            ref={storyRef}
                            className={`text-sm text-gray-700 ${!isExpanded ? 'line-clamp-3' : ''}`}
                            style={{
                                display: '-webkit-box',
                                WebkitLineClamp: !isExpanded ? 3 : 'unset',
                                WebkitBoxOrient: 'vertical',
                                overflow: !isExpanded ? 'hidden' : 'visible',
                            }}
                        >
                            {user.story || '등록된 이야기가 없습니다.'}
                        </p>
                        {isClamped && (
                            <div
                                onClick={toggleExpanded}
                                className="text-center text-[#a6acba] text-sm font-medium underline leading-tight mt-4 cursor-pointer"
                            >
                                {isExpanded ? '접기' : '펼치기'}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

};

export default AIProfile;