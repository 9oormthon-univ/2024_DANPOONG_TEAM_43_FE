import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

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
    if (value instanceof Date) {
      setSelectedDate(value); 
    } else if (Array.isArray(value) && value.length === 2 && value[0] instanceof Date) {
      setSelectedDate(value[0]); 
    } else {
      setSelectedDate(null);
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
          onChange={(value, event) => handleDateChange(value as Date | [Date, Date] | null, event)}
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
