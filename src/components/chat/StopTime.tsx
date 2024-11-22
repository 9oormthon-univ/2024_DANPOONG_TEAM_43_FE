import React, { useState } from 'react'

interface StopTimeProps {
    closeModal: () => void;
    onTimeSelect: (time: string) => void; // closeModal은 아무것도 반환하지 않는 함수
}

const StopTime: React.FC<StopTimeProps> = ({ closeModal, onTimeSelect }) => {
    const [selectedPeriod, setSelectedPeriod] = useState<'AM' | 'PM'>('AM'); // 오전/오후 선택 상태
    const [selectedHour, setSelectedHour] = useState<number | null>(null); // 선택된 시
    const [selectedMinute, setSelectedMinute] = useState<number | null>(null); // 선택된 분

    const handlePeriodClick = (period: 'AM' | 'PM') => {
        setSelectedPeriod(period); // 오전/오후 설정
    };

    const handleHourClick = (hour: number) => {
        setSelectedHour(hour); // 시 선택
    };

    const handleMinuteClick = (minute: number) => {
        setSelectedMinute(minute); // 분 선택
    };
    const handleConfirm = () => {
        if (selectedHour !== null && selectedMinute !== null) {
            const formattedTime = `${selectedPeriod === 'AM' ? '오전' : '오후'} ${selectedHour}시 ${selectedMinute}분`;
            onTimeSelect(formattedTime); // 부모 컴포넌트에 시간 전달
            closeModal(); // 모달 닫기
        } else {
            alert('시간과 분을 모두 선택해주세요.');
        }
    };


    return (
        <div className='popup_div'>
            <div className="time">
                <div className="title_top">
                    <p className="title">종료 시간</p>
                    <p className="time_text">
                    {`${selectedPeriod === 'AM' ? '오전' : '오후'} ${
                            selectedHour !== null ? selectedHour : '00'
                        }시 ${selectedMinute !== null ? selectedMinute : '00'}분`}
                    </p>
                </div>

                <div className="half">
                    <div className={`${selectedPeriod === 'AM' ? 'am' : 'pm'}`}
                        onClick={() => handlePeriodClick('AM')}>오전</div>
                    <div className={`${selectedPeriod === 'PM' ? 'am' : 'pm'}`}
                        onClick={() => handlePeriodClick('PM')}>오후</div>
                </div>
                <div className="num_div">
                    <div className="num">
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                            <p
                                key={hour}
                                className={selectedHour === hour ? 'choice' : 'nomal'}
                                onClick={() => handleHourClick(hour)}
                            >
                                {hour}
                            </p>
                        ))}
                    </div>
                    <p className="text">시</p>
                </div>
                <div className="num_div">
                    <div className="num">
                    {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                            <p
                                key={minute}
                                className={selectedMinute === minute ? 'choice' : 'nomal'}
                                onClick={() => handleMinuteClick(minute)}
                            >
                                {minute}
                            </p>
                        ))}
                    </div>
                    <p className="text">분</p>
                </div>
                <div className="button_div">
                    <div className="button" onClick={handleConfirm}>확인</div>
                </div>
            </div>
        </div>
    )
}

export default StopTime