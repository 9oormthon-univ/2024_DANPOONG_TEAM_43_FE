import React, { useState } from 'react';
import Calendar from 'react-calendar';
import moment from "moment";
import 'react-calendar/dist/Calendar.css'; // react-calendar 기본 스타일

interface CalendarPopupProps {
  onClose: () => void;
  onSelectDate: (date: Date) => void;
}

const ChatCalendar: React.FC<CalendarPopupProps> = ({ onClose, onSelectDate }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (
    value: Date | [Date, Date] | null,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // value를 명시적으로 단언하여 타입 오류를 방지
    if (value instanceof Date) {
      setSelectedDate(value); // 단일 날짜 선택
    } else if (Array.isArray(value) && value.length === 2 && value[0] instanceof Date) {
      setSelectedDate(value[0]); // 범위 선택 시 첫 번째 날짜 저장
    } else {
      setSelectedDate(null); // 값이 없을 경우
    }
  };


  const handleConfirm = () => {
    if (selectedDate) {
      onSelectDate(selectedDate);
      onClose();
    } else {
      alert('날짜를 선택해주세요.');
    }
  };
  

  return (
    <div className="calendar-popup-overlay" onClick={onClose}>
      <div className="calendar-popup-content" onClick={(e) => e.stopPropagation()}>
        <Calendar
onChange={(value, event) =>
  handleDateChange(value as Date | [Date, Date] | null, event)
} // 이벤트 객체 전달          
formatDay={(locale, date) => date.getDate().toString()}
          value={selectedDate}
          className="custom-calendar"
        />
        <button className="confirm-button" onClick={handleConfirm}>
          확인
        </button>
      </div>
    </div>
  );
};

export default ChatCalendar;
